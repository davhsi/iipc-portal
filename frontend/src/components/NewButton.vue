<template>
  <div class="mt-6 flex justify-end">
    <router-link :to="newFormRoute">
      <button class="bg-blue-600 text-white p-2 rounded">New</button>
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Determine the new form route dynamically
const newFormRoute = computed(() => {
  if (route.path.includes('/dashboard/industry-expert')) {
    return '/dashboard/industry-expert/new';
  } else if (route.path.includes('/dashboard/faculty-visit')) {
    return '/dashboard/faculty-visit/new';
  }
  return '/'; // Default fallback (home page or error handling)
});
</script>
