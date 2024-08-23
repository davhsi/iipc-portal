<template>
  <div>
    <Header title="Faculty Visit Dashboard" />

    <!-- Filters and Search Bar -->
    <div class="flex justify-between items-center mt-6">
      <!-- Left section: Search and Filters -->
      <div class="flex space-x-4">
        <div class="relative">
          <input type="text" placeholder="Search.." class="border rounded px-4 py-2" />
          <i class="fas fa-search absolute right-3 top-3"></i>
        </div>
        <select class="border rounded px-4 py-2">
          <option>Year</option>
          <!-- Add more options here -->
        </select>
        <select class="border rounded px-4 py-2">
          <option>Domain</option>
          <!-- Add more options here -->
        </select>
        <select class="border rounded px-4 py-2">
          <option>Location</option>
          <!-- Add more options here -->
        </select>
        <select class="border rounded px-4 py-2">
          <option>Ratings</option>
          <!-- Add more options here -->
        </select>
      </div>

      <!-- Right section: Sort and Action buttons -->
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <span>Sort:</span>
          <select class="border rounded px-4 py-2">
            <option>Most Recent</option>
            <!-- Add more options here -->
          </select>
        </div>
        <button class="flex items-center bg-gray-200 p-2 rounded text-black">
          <i class="fas fa-download mr-2 text-black"></i>
          <span class="text-black">Export</span>
        </button>

        <button class="bg-gray-200 p-2 rounded">
          <i class="fas fa-ellipsis-v"></i>
        </button>
      </div>
    </div>

    <!-- New Button -->
    <div class="mt-6 flex justify-end">
      <router-link to="/dashboard/industry-expert/new">
        <button class="bg-blue-600 text-white p-2 rounded">New</button>
      </router-link>
    </div>

    <!-- Table -->
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
/* General styles for the search and filter section */
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

/* FontAwesome icons alignment */
.fa-search,
.fa-download,
.fa-ellipsis-v {
  font-size: 1rem;
}
</style>
