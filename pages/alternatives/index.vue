<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-10">
    <div class="max-w-4xl mx-auto px-4">
      <h2
        class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center"
      >
        Alternative Programs
      </h2>
      <p class="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center">
        Explore open-source, privacy-friendly, and innovative alternatives to
        popular software.
      </p>

      <!-- Loading wait screen with v-if -->
      <div
        v-if="loading"
        class="text-center text-blue-600 dark:text-blue-400 font-semibold py-8"
      >
        Loading...
      </div>

      <!-- Error message with v-else-if -->
      <div v-else-if="error" class="text-center text-red-500 py-8">
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
            class="block hover:scale-105 transition-transform"
          >
            <div
              class="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-md p-4 h-full flex flex-col items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <img
                :src="program.logo"
                :alt="`${program.name} logo`"
                class="w-16 h-16 mb-2 rounded bg-gray-200 dark:bg-gray-700 object-contain"
              />
              <h3
                class="text-lg font-bold text-gray-900 dark:text-gray-100 text-center mt-2"
              >
                {{ program.name }}
              </h3>
              <p
                class="text-sm text-gray-600 dark:text-gray-400 text-center flex-grow mt-1"
              >
                {{ program.description }}
              </p>
              <p
                class="text-xs text-blue-600 dark:text-blue-400 text-center mt-3 font-semibold"
              >
                View Alternatives
              </p>
            </div>
          </NuxtLink>
        </div>
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
