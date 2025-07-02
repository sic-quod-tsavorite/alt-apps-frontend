<template>
  <div v-if="program">
    <h2>dynamic route for {{ program.name }}</h2>
    <p>{{ program.description }}</p>
    <img :src="program.logo" alt="program.name" />
    <p>{{ program.country }}</p>
    <p>{{ program.altPrograms }}</p>
  </div>
  <div v-else>
    <h2 class="text-2xl font-bold text-center mt-8">
      Error 404: Page Not Found
    </h2>
    <p class="text-center mt-4">Program doesn't exist.</p>
  </div>
</template>

<script setup lang="ts">
import { usePrgs } from "@/composables/usePrgs";
import type { Program } from "@/types/interfaces";

const { id } = useRoute().params;
const program = ref<Program | null>(null);
const { fetchPrgById } = usePrgs();

onMounted(async () => {
  const programId = id as string;
  const fetchedProgram = await fetchPrgById(programId);
  program.value = Array.isArray(fetchedProgram)
    ? fetchedProgram[0] ?? null
    : fetchedProgram;
});
</script>

<style lang="scss" scoped></style>
