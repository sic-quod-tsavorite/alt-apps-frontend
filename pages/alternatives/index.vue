<template>
  <div>
    <h2>Page for alternatives</h2>
  </div>
  <div>
    <h2>Programs</h2>

    <!-- Loading wait screen with v-if -->
    <div v-if="loading" class="text-center">Loading...</div>

    <!-- Error message with v-else-if -->
    <div v-else-if="error" class="text-center text-red-500">
      <p>
        Error loading programs:
        {{ error || "500 Internal Server Error" }}
      </p>
    </div>

    <!-- Loop through the programs -->
    <div v-else class="flex flex-wrap -mx-2">
      <div
        v-for="program in programs"
        :key="program._id"
        class="p-2 w-full sm:w-1/2 md:w-1/3"
      >
        <NuxtLink
          :to="`/alternatives/${program._id}`"
          class="text-blue-500 hover:underline"
        >
          <div class="border rounded p-4 h-full flex flex-col">
            <img
              :src="program.logo"
              :alt="`${program.name} logo`"
              class="w-16 h-16 mx-auto"
            />
            <h3 class="text-lg font-bold text-center mt-2">
              {{ program.name }}
            </h3>
            <p
              class="text-sm text-gray-600 dark:text-gray-400 text-center flex-grow"
            >
              {{ program.description }}
            </p>
            <p class="text-xs text-center mt-2">View Alternatives</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePrgs } from "~/composables/usePrgs";

const { programs, fetchPrgs, error, loading } = usePrgs();

onMounted(() => {
  fetchPrgs();
});
</script>

<style lang="scss" scoped></style>
