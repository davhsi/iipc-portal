<template>
  <div>
    <Header title="Industry Experts Dashboard" />
    <NewButton />

    <div class="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-4">Search Filters</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <!-- Existing filter fields -->
        <div>
          <label class="block mb-2 font-medium">Name:</label>
          <input v-model="searchName" type="text" placeholder="Enter expert name" class="border p-2 rounded w-full" />
        </div>
        
        <div>
          <label class="block mb-2 font-medium">Start Date:</label>
          <input v-model="startDate" type="date" class="border p-2 rounded w-full" />
        </div>
        
        <div>
          <label class="block mb-2 font-medium">End Date:</label>
          <input v-model="endDate" type="date" class="border p-2 rounded w-full" />
        </div>
        
        <div>
          <label class="block mb-2 font-medium">Company Address:</label>
          <select v-model="selectedCompanyAddress" class="border p-2 rounded w-full">
            <option value="">Choose Company Address</option>
            <option v-for="address in uniqueCompanyAddresses" :key="address" :value="address">{{ address }}</option>
          </select>
        </div>

        <div>
          <label class="block mb-2 font-medium">Domain of Expertise:</label>
          <select v-model="selectedDomainOfExpertise" class="border p-2 rounded w-full">
            <option value="">Choose Domain</option>
            <option v-for="domain in uniqueDomains" :key="domain" :value="domain">{{ domain }}</option>
          </select>
        </div>

        <div>
          <label class="block mb-2 font-medium">Event Type:</label>
          <select v-model="selectedEventType" class="border p-2 rounded w-full">
            <option value="">Choose Event Type</option>
            <option v-for="event in uniqueEventTypes" :key="event" :value="event">{{ event }}</option>
          </select>
        </div>

        <div>
          <label class="block mb-2 font-medium">Star Rating:</label>
          <select v-model="selectedRating" class="border p-2 rounded w-full">
            <option value="">Choose Rating</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      <!-- Flex container for buttons, aligned to the left -->
      <div class="flex justify-start items-center space-x-4 mb-4">
        <button
          @click="searchExperts"
          class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>

        <button
          @click="exportToExcel"
          class="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
        >
          Export to Excel
        </button>

        <button
          @click="clearFilters"
          class="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-200"
        >
          Clear Filters
        </button>
      </div>

      <Table v-if="experts.length" :data="experts" @edit="editExpert" class="mt-6 w-full" />
      <p v-else>No experts found.</p>
      <p v-if="loading">Loading experts...</p>
    </div>
  </div>
</template>

<script setup>
// Existing imports
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import Table from '../components/IndustryExpertTable.vue';
import NewButton from '../components/NewButton.vue';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import xlsx library

// Reactive variables
const experts = ref([]);
const loading = ref(true);
const searchName = ref(''); 
const startDate = ref('');
const endDate = ref('');
const selectedCompanyAddress = ref('');
const selectedDomainOfExpertise = ref('');
const selectedEventType = ref('');
const selectedRating = ref('');
const uniqueCompanyAddresses = ref([]);
const uniqueDomains = ref([]);
const uniqueEventTypes = ref([]);
const router = useRouter();

// Fetch unique filters and experts on component mount
onMounted(async () => {
  loading.value = true;
  try {
    uniqueCompanyAddresses.value = await fetchUniqueCompanyAddresses();
    uniqueDomains.value = await fetchUniqueDomains();
    uniqueEventTypes.value = await fetchUniqueEventTypes();
    
    await fetchExperts(); 
  } finally {
    loading.value = false;
  }
});

// Fetch experts based on filters
const fetchExperts = async (filters = {}) => {
  console.log('Fetching experts with filters:', filters);
  try {
    const response = await axios.post('http://localhost:3000/api/industry-expert/experts/search', filters);
    experts.value = response.data;
    console.log('Fetched experts:', experts.value);
  } catch (error) {
    console.error('Error fetching experts:', error.response ? error.response.data : error.message);
  }
};

// Search button click handler
const searchExperts = () => {
  const filters = {
    name: searchName.value.trim() || undefined,
    startDate: startDate.value || undefined,
    endDate: endDate.value || undefined,
    companyAddress: selectedCompanyAddress.value || undefined,
    domainOfExpertise: selectedDomainOfExpertise.value || undefined,
    eventType: selectedEventType.value || undefined,
    rating: selectedRating.value || undefined,
  };

  const cleanedFilters = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== undefined));
  console.log('Filters sent to server:', cleanedFilters);
  fetchExperts(cleanedFilters);
};

// Clear filters method
const clearFilters = () => {
  searchName.value = '';
  startDate.value = '';
  endDate.value = '';
  selectedCompanyAddress.value = '';
  selectedDomainOfExpertise.value = '';
  selectedEventType.value = '';
  selectedRating.value = '';
  fetchExperts(); // Fetch experts again with no filters
};
// Methods to fetch unique filters
const fetchUniqueCompanyAddresses = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/industry-expert/locations');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const addresses = await response.json();
    return addresses;
  } catch (error) {
    console.error('Error fetching unique company addresses:', error.message);
    alert('Failed to fetch unique company addresses. Please check the console for more details.');
    return [];
  }
};

const fetchUniqueDomains = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/industry-expert/domains');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const domains = await response.json();
    return domains;
  } catch (error) {
    console.error('Error fetching unique domains:', error.message);
    alert('Failed to fetch unique domains. Please check the console for more details.');
    return [];
  }
};

const fetchUniqueEventTypes = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/industry-expert/event-types');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const eventTypes = await response.json();
    return eventTypes;
  } catch (error) {
    console.error('Error fetching unique event types:', error.message);
    alert('Failed to fetch unique event types. Please check the console for more details.');
    return [];
  }
};

// Method to handle editing an expert
const editExpert = (expertId) => {
  router.push(`/dashboard/industry-expert/edit/${expertId}`);
};

// Method to export table data to Excel
const exportToExcel = () => {
  if (experts.value.length === 0) {
    alert('No data to export.');
    return;
  }

  // Convert table data to a format suitable for Excel
  const worksheet = XLSX.utils.json_to_sheet(experts.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Industry Experts');

  // Create and trigger the download
  XLSX.writeFile(workbook, 'industry_experts.xlsx');
};
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
  @apply outline-none ring-2 ring-blue-400;
}

.grid {
  @apply gap-6;
}

.flex {
  @apply justify-start space-x-4; /* Added space between buttons */
}

input,
select {
  @apply p-3 border rounded w-full;
}
</style>