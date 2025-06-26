import type { Program } from "../types/interfaces";

const config = useRuntimeConfig();
const API_URL = config.public.BE_API_URL;

export const usePrgs = () => {
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

  return {
    error,
    loading,
    programs,
    fetchPrgs,
  };
};
