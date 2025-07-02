import type { Program, newPrg } from "../types/interfaces";

export const usePrgs = () => {
  const config = useRuntimeConfig();
  const API_URL = config.public.BE_API_URL;
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const programs = ref<Program[]>([]);

  const fetchPrgs = async () => {
    loading.value = true;
    try {
      const response = await fetch(API_URL + "/programs");
      if (!response.ok) {
        throw new Error("Failed to fetch programs");
      }
      const data: Program[] = await response.json();
      programs.value = data;
      console.log("Programs fetched: ", programs.value);
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

  const validatePrg = (program: newPrg): void => {
    if (!program.name) {
      throw new Error("Program name cannot be empty");
    }
  };

  const setDefaultValues = (program: newPrg, userId: string) => {
    return {
      name: program.name,
      description:
        program.description || "New Program description default value",
      logo: program.logo || "https://picsum.photos/500/500",
      country: program.country || "New Program country default value",
      isHidden: program.isHidden || false,
      altPrograms: program.altPrograms || [],
      _createdBy: userId,
    };
  };

  const addPrg = async (program: newPrg): Promise<void> => {
    try {
      const { token, userId } = getTokenAndUserId();
      validatePrg(program);
      const programWithDefaults = setDefaultValues(program, userId);

      const response = await fetch(API_URL + "/programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(programWithDefaults),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "No data available");
      }
      const newPrg: Program = await response.json();
      programs.value.push(newPrg);
      console.log("program added", newPrg);
      await fetchPrgs();
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  const deletePrgFromServer = async (
    id: string,
    token: string
  ): Promise<void> => {
    const response = await fetch(API_URL + `/programs/${id}`, {
      method: "DELETE",
      headers: {
        //"Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (!response.ok) {
      console.log("Program failed to delete");
      throw new Error("No data available");
    }
  };

  const removePrgFromState = (id: string): void => {
    programs.value = programs.value.filter((program) => program._id !== id);
    console.log("program deleted", id);
  };

  const deletePrg = async (id: string): Promise<void> => {
    try {
      const { token } = getTokenAndUserId();

      await deletePrgFromServer(id, token);

      removePrgFromState(id);
      console.log("id test: ", id);
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  const updatePrgOnServer = async (
    id: string,
    updatedPrg: Partial<Program>,
    token: string
  ): Promise<Program> => {
    const response = await fetch(API_URL + `/programs/${id}`, {
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
      return { message: responseText } as unknown as Program;
    } //return await response.json();
  };

  const updatePrgInState = (id: string, updatedPrg: Program) => {
    const index = programs.value.findIndex((program) => program._id === id);
    if (index !== -1) {
      programs.value[index] = updatedPrg;
    }
  };

  const updatePrg = async (
    id: string,
    updatedPrg: Partial<Program>
  ): Promise<void> => {
    try {
      const { token } = getTokenAndUserId();
      const updatedPrgResponse = await updatePrgOnServer(id, updatedPrg, token);
      updatePrgInState(id, updatedPrgResponse);
      await fetchPrgs();
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  const fetchPrgById = async (id: string): Promise<Program[] | null> => {
    try {
      const response = await fetch(API_URL + `/programs/${id}`);
      if (!response.ok) {
        throw new Error("No data avaiveble");
      }
      const data: Program[] = await response.json();
      console.log("program fetched", data);
      return data;
    } catch (err) {
      console.log("error", err);
      return null;
    }
  };

  return {
    error,
    loading,
    programs,
    fetchPrgs,
    addPrg,
    deletePrg,
    updatePrg,
    fetchPrgById,
    getTokenAndUserId,
  };
};
