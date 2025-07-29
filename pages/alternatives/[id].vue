<template>
  <div
    v-if="program"
    class="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mt-8"
  >
    <div class="flex items-center gap-4 mb-4">
      <img
        :src="program.logo"
        alt="program.name"
        class="w-20 h-20 object-cover rounded-md border dark:border-gray-700"
      />
      <div>
        <h2 class="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">
          {{ program.name }}
        </h2>
        <p class="text-gray-500 dark:text-gray-400">{{ program.country }}</p>
      </div>
    </div>
    <p class="mb-6 text-gray-700 dark:text-gray-300">
      {{ program.description }}
    </p>
    <div v-if="program.altPrograms && program.altPrograms.length">
      <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
        Alternative Programs:
      </h3>
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <li
          v-for="alt in program.altPrograms"
          :key="alt._id"
          class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          <img
            :src="alt.logo"
            :alt="alt.name"
            class="w-12 h-12 object-cover rounded-md border dark:border-gray-700"
          />
          <div>
            <span
              class="font-medium text-lg text-gray-900 dark:text-gray-100"
              >{{ alt.name }}</span
            >
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ alt.country }}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p class="text-gray-400 dark:text-gray-500 mt-4">
        No alternative programs found.
      </p>
    </div>
  </div>
  <div v-else>
    <h2
      class="text-2xl font-bold text-center mt-8 text-red-600 dark:text-red-400"
    >
      Error 404: Page Not Found
    </h2>
    <p class="text-center mt-4 text-gray-500 dark:text-gray-400">
      Program doesn't exist.
    </p>
  </div>
</template>

<script setup lang="ts">
import { usePrgs } from "@/composables/usePrgs";
import { useAltPrgs } from "@/composables/useAltPrgs";
import type { Program, AltProgram } from "@/types/interfaces";

const { id } = useRoute().params;
const program = ref<Program | null>(null);
const { fetchPrgById } = usePrgs();
const { fetchAltPrgById } = useAltPrgs();

onMounted(async () => {
  // Step 1: Fetch the main program
  const programId = id as string;
  const fetchedProgramArr = await fetchPrgById(programId);
  const fetchedProgram = Array.isArray(fetchedProgramArr)
    ? fetchedProgramArr[0] ?? null
    : fetchedProgramArr;

  program.value = fetchedProgram;

  // Step 2: Only fetch alt programs if program is loaded and has altPrograms IDs
  if (program.value && Array.isArray(program.value.altPrograms)) {
    const altIds = program.value.altPrograms as unknown as string[];
    const promises = altIds.map((altId: string) => fetchAltPrgById(altId));
    const results = await Promise.all(promises);
    const altPrograms: AltProgram[] = results
      .flat()
      .filter(
        (alt): alt is AltProgram => alt !== null && typeof alt === "object"
      );
    // Assign to program.altPrograms
    program.value.altPrograms = altPrograms;
  }
});
</script>

<style lang="scss" scoped></style>
