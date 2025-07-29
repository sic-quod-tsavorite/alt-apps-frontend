import type { AltProgram, newAltPrg } from "../types/interfaces";

export const useAltPrgs = () => {
  const config = useRuntimeConfig();
  const API_URL = config.public.BE_API_URL;
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const altPrograms = ref<AltProgram[]>([]);

  const fetchAltPrgs = async () => {
    loading.value = true;
    try {
      const response = await fetch(API_URL + "/alt-programs");
      if (!response.ok) {
        throw new Error("Failed to fetch programs");
      }
      const data: AltProgram[] = await response.json();
      altPrograms.value = data;
      console.log("Programs fetched: ", altPrograms.value);
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false; // No matter what happens, loading will be set to false
    }
  };

  const getTokenAndUserId = (): { token: string; userId: string } => {
    const token = localStorage.getItem("lsToken");
    const userId = localStorage.getItem("userIDToken");
    if (!token || !userId) {
      throw new Error("No token or user available");
    }
    return { token, userId };
  };

  const validateAltPrg = (altProgram: newAltPrg): void => {
    if (!altProgram.name) {
      throw new Error("Program name cannot be empty");
    }
  };

  const setDefaultValues = (altProgram: newAltPrg, userId: string) => {
    return {
      name: altProgram.name,
      description:
        altProgram.description || "New altProgram description default value",
      logo: altProgram.logo || "https://picsum.photos/500/500",
      country: altProgram.country || "New altProgram country default value",
      isHidden: altProgram.isHidden || false,
      _createdBy: userId,
    };
  };

  const addAltPrg = async (altProgram: newAltPrg): Promise<void> => {
    try {
      const { token, userId } = getTokenAndUserId();
      validateAltPrg(altProgram);
      const altProgramWithDefaults = setDefaultValues(altProgram, userId);

      const response = await fetch(API_URL + "/alt-programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(altProgramWithDefaults),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "No data available");
      }
      const newAltPrg: AltProgram = await response.json();
      altPrograms.value.push(newAltPrg);
      console.log("altProgram added", newAltPrg);
      await fetchAltPrgs();
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  const deleteAltPrgFromServer = async (
    id: string,
    token: string
  ): Promise<void> => {
    const response = await fetch(API_URL + `/alt-programs/${id}`, {
      method: "DELETE",
      headers: {
        //"Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (!response.ok) {
      console.log("Alt Program failed to delete");
      throw new Error("No data available");
    }
  };

  const removeAltPrgFromState = (id: string): void => {
    altPrograms.value = altPrograms.value.filter(
      (altProgram) => altProgram._id !== id
    );
    console.log("alt program deleted", id);
  };

  const deleteAltPrg = async (id: string): Promise<void> => {
    try {
      const { token } = getTokenAndUserId();

      await deleteAltPrgFromServer(id, token);

      removeAltPrgFromState(id);
      console.log("id test: ", id);
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  const updateAltPrgOnServer = async (
    id: string,
    updatedPrg: Partial<AltProgram>,
    token: string
  ): Promise<AltProgram> => {
    const response = await fetch(API_URL + `/alt-programs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(updatedPrg),
    });
    if (!response.ok) {
      throw new Error("No data available");
    }

    const responseText = await response.text();
    try {
      return JSON.parse(responseText);
    } catch {
      return { message: responseText } as unknown as AltProgram;
    } //return await response.json();
  };

  const updateAltPrgInState = (id: string, updatedPrg: AltProgram) => {
    const index = altPrograms.value.findIndex(
      (altProgram) => altProgram._id === id
    );
    if (index !== -1) {
      altPrograms.value[index] = updatedPrg;
    }
  };

  const updateAltPrg = async (
    id: string,
    updatedAltPrg: Partial<AltProgram>
  ): Promise<void> => {
    try {
      const { token } = getTokenAndUserId();
      const updatedAltPrgResponse = await updateAltPrgOnServer(
        id,
        updatedAltPrg,
        token
      );
      updateAltPrgInState(id, updatedAltPrgResponse);
      await fetchAltPrgs();
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  const fetchAltPrgById = async (id: string): Promise<AltProgram[] | null> => {
    try {
      const response = await fetch(API_URL + `/alt-programs/${id}`);
      if (!response.ok) {
        throw new Error("No data avaiveble");
      }
      const data: AltProgram[] = await response.json();
      console.log("alt program fetched", data);
      return data;
    } catch (err) {
      console.log("error", err);
      return null;
    }
  };

  return {
    error,
    loading,
    altPrograms,
    fetchAltPrgs,
    addAltPrg,
    deleteAltPrg,
    updateAltPrg,
    fetchAltPrgById,
    getTokenAndUserId,
  };
};
