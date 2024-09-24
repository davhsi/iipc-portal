<template>
  <div>
    <Header title="Industry Experts Dashboard" />
    <NewButton />
    <div class="mt-6">
      <Table v-if="experts.length" :data="experts" @edit="editExpert" />
      <p v-else>No experts found.</p>
      <p v-if="loading">Loading experts...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import Table from '../components/IndustryExpertTable.vue';
import NewButton from '../components/NewButton.vue';

const experts = ref([]);
const loading = ref(true); // Added loading state
const router = useRouter();

const fetchExperts = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/industry-expert/experts`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    experts.value = await response.json();
  } catch (error) {
    console.error('Error fetching experts:', error.message);
    alert('Failed to fetch experts. Please check the console for more details.');
  } finally {
    loading.value = false; // Set loading to false after fetching
  }
};

const editExpert = (expertId) => {
  router.push(`/dashboard/industry-expert/edit/${expertId}`);
};

onMounted(() => {
  fetchExperts();
});
</script>

<style scoped>
div {
  @apply text-black;
}

button {
  @apply text-white;
}

input:focus,
select:focus,
button:focus {
  @apply outline-none ring-2 ring-blue-300;
}

.fa-search,
.fa-download,
.fa-ellipsis-v {
  @apply text-lg;
}
</style>
