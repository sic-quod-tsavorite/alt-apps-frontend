<template>
  <div
    class="min-h-screen flex flex-col items-center pt-50 bg-gray-100 dark:bg-gray-900"
  >
    <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
      Welcome to Alt-Apps!
    </h1>
    <p
      class="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl text-center"
    >
      Discover alternative programs to popular software. Find open-source,
      privacy-friendly, and innovative options for your everyday needs.
    </p>
    <NuxtLink
      to="/alternatives"
      class="px-6 py-3 rounded bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-100 font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition"
    >
      Browse Alternatives
    </NuxtLink>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
