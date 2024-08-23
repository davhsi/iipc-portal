<template>
  <div>
    <Header title="Industry Experts Dashboard" />

    <div class="flex justify-between items-center mt-6">
      <SearchFilters />
      <SortActions :data="experts" />
    </div>

    <NewButton />

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
import SearchFilters from '../components/SearchFilters.vue';
import SortActions from '../components/SortActions.vue';
import NewButton from '../components/NewButton.vue';

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

input,
select,
button {
  transition: all 0.3s ease;
}

input:focus,
select:focus,
button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.fa-search,
.fa-download,
.fa-ellipsis-v {
  font-size: 1rem;
}
</style>
