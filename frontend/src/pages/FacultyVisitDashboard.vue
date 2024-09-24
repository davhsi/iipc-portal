<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 text-black">Faculty Visits</h1>
    
    <!-- New Button to Add Faculty Visit -->
    <router-link to="/dashboard/faculty-visit/new">
      <button class="bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600 transition">
        Add New Faculty Visit
      </button>
    </router-link>
    
    <FacultyVisitTable :visits="visits" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FacultyVisitTable from '../components/FacultyVisitTable.vue';

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
