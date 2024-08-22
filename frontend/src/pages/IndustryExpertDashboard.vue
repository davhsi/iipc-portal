<template>
  <div>
    <Header title="Industry Experts Dashboard" />
    <div class="mt-6 flex justify-end">
      <router-link to="/dashboard/industry-expert/new">
        <button class="bg-blue-600 text-white p-2 rounded">New</button>
      </router-link>
    </div>
    <div class="mt-6">
      <Table :data="experts" @edit="editExpert" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import Table from '../components/Table.vue';

const experts = ref([]);
const router = useRouter();

const fetchExperts = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/experts');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    experts.value = await response.json();
  } catch (error) {
    console.error('Error fetching experts:', error.message);
    alert('Failed to fetch experts. Please check the console for more details.');
  }
};

// Function to handle edit action
const editExpert = (expertId) => {
  router.push(`/dashboard/industry-expert/edit/${expertId}`);
};

onMounted(() => {
  fetchExperts();
});
</script>

<style scoped>
div {
  color: black;
}

button {
  color: white;
}

.mt-6 {
  margin-top: 1.5rem;
}
</style>
