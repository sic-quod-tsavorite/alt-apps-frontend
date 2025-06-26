<template>
  <div>
    <h2>dynamic route for {{ name }}</h2>
    <p>text</p>
  </div>
</template>

<script setup>
const { name } = useRoute().params;
</script>

<style lang="scss" scoped></style>
