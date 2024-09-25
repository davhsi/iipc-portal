<template>
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold text-black">{{ title }}</h1>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
});
</script>
