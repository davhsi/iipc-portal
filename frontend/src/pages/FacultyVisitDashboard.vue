<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 text-black">Faculty Visits</h1>
    <FacultyVisitTable :visits="visits" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FacultyVisitTable from './FacultyVisitTable.vue'; // Import your table component

const visits = ref([]);

const fetchVisits = async () => {
  const response = await fetch('http://localhost:3000/api/faculty-visits');
  visits.value = await response.json();
};

onMounted(() => {
  fetchVisits();
});
</script>

<style scoped>
.text-black {
  color: black;
}
</style>
