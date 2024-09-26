<template>
  <div class="h-screen flex flex-col">
    <!-- Heading and New Button -->
    <div class="flex justify-between items-center mb-4">
      <Header title="Industry Expert Dashboard" />
      <NewButton />
    </div>

    <!-- Search Filters Section (Static) -->
    <div class="bg-white p-4 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-4 text-black">Search Filters</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Domain of Expertise -->
        <div>
          <label class="block mb-1 font-medium text-black">Domain of Expertise:</label>
          <select v-model="selectedDomain" class="border p-2 rounded w-full text-black">
            <option value="">Choose Domain</option>
            <option v-for="domain in uniqueDomains" :key="domain" :value="domain">{{ domain }}</option>
          </select>
        </div>
        <!-- Company Address -->
        <div>
          <label class="block mb-1 font-medium text-black">Company Address:</label>
          <select v-model="selectedLocation" class="border p-2 rounded w-full text-black">
            <option value="">Choose Location</option>
            <option v-for="location in uniqueLocations" :key="location" :value="location">{{ location }}</option>
          </select>
        </div>
        <!-- Start Date -->
        <div>
          <label class="block mb-1 font-medium text-black">Start Date:</label>
          <input v-model="startDate" type="date" class="border p-2 rounded w-full text-black" />
        </div>
        <!-- End Date -->
        <div>
          <label class="block mb-1 font-medium text-black">End Date:</label>
          <input v-model="endDate" type="date" class="border p-2 rounded w-full text-black" />
        </div>
        <!-- Event Type -->
        <div>
          <label class="block mb-1 font-medium text-black">Event Type:</label>
          <select v-model="selectedEventType" class="border p-2 rounded w-full text-black">
            <option value="">Choose Event Type</option>
            <option v-for="type in uniqueEventTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
        <!-- Star Ratings -->
        <div>
          <label class="block mb-1 font-medium text-black">Star Ratings:</label>
          <select v-model="selectedStarRating" class="border p-2 rounded w-full text-black">
            <option value="">Choose Rating</option>
            <option v-for="rating in uniqueStarRatings" :key="rating" :value="rating">{{ rating }} Star</option>
          </select>
        </div>
      </div>

      <!-- Search, Clear, and Export Buttons -->
      <div class="flex justify-start items-center space-x-2 mt-4">
        <button @click="searchIndustryExperts"
          class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm">
          Search
        </button>
        <button @click="clearFilters"
          class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition text-sm">
          Clear
        </button>
        <button @click="exportToExcel"
          class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-sm">
          Export to Excel
        </button>

      </div>
    </div>

    <!-- Scrollable Table Section -->
    <div class="mt-6 bg-white p-4 rounded-lg shadow-md flex-grow overflow-y-auto">
      <table class="min-w-full border-collapse">
        <thead class="bg-gray-200 sticky top-0 z-10">
          <tr>
            <th class="px-3 py-2 text-left text-black">S.No</th>
            <th class="px-3 py-2 text-left text-black">First Name</th>
            <th class="px-3 py-2 text-left text-black">Last Name</th>
            <th class="px-3 py-2 text-left text-black">Domain</th>
            <th class="px-3 py-2 text-left text-black">Company</th>
            <th class="px-3 py-2 text-left text-black">Event</th>
            <th class="px-3 py-2 text-left text-black">Event Date</th>
            <th class="px-3 py-2 text-left text-black">Star Rating</th>
            <th class="px-3 py-2 text-center text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(expert, index) in industryExperts" :key="expert._id" class="hover:bg-gray-50">
            <td class="border-t px-3 py-2 text-black">{{ index + 1 }}</td>
            <td class="border-t px-3 py-2 text-black">{{ expert.firstname }}</td>
            <td class="border-t px-3 py-2 text-black">{{ expert.lastname }}</td>
            <td class="border-t px-3 py-2 text-black">{{ expert.domainOfExpertise || 'N/A' }}</td>
            <td class="border-t px-3 py-2 text-black">{{ expert.companyName || 'N/A' }}</td>
            <td class="border-t px-3 py-2 text-black">{{ expert.eventType || 'N/A' }}</td>
            <td class="border-t px-3 py-2 text-black">{{ formatDate(expert.eventDate) }}</td>
            <td class="border-t px-3 py-2 text-black">
              <div class="flex">
                <span v-for="star in 5" :key="star" class="text-yellow-500">
                  <i :class="{ 'fas fa-star': expert.rating >= star, 'far fa-star': expert.rating < star }"></i>
                </span>
              </div>
            </td>
            <td class="border-t px-4 py-2 text-center">
              <button class="bg-blue-500 text-white py-1 px-2 rounded mr-2 hover:bg-blue-600 transition"
                @click="editIndustryExpert(expert._id)">
                <i class="fas fa-edit"></i>
              </button>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';  // Import useRouter
import Header from '../components/Header.vue';
import NewButton from '../components/NewButton.vue';
import axios from 'axios';
import * as XLSX from 'xlsx';

const router = useRouter();  // Create a router instance

const industryExperts = ref([]);
const startDate = ref('');
const endDate = ref('');
const selectedDomain = ref('');
const selectedLocation = ref('');
const selectedEventType = ref('');
const selectedStarRating = ref('');
const uniqueDomains = ref([]);
const uniqueLocations = ref([]);
const uniqueEventTypes = ref([]);
const uniqueStarRatings = ref([]);
const page = ref(1); // Define the page variable

onMounted(async () => {
  await fetchUniqueFilters();
  await fetchIndustryExperts();
});


// Fetch unique filters from the API
const fetchUniqueFilters = async () => {
  try {
    const [domainsResponse, locationsResponse, typesResponse, ratingsResponse] = await Promise.all([
      axios.get('http://localhost:3000/api/industry-experts/domains'),
      axios.get('http://localhost:3000/api/industry-experts/locations'),
      axios.get('http://localhost:3000/api/industry-experts/event-types'),
      axios.get('http://localhost:3000/api/industry-experts/star-ratings'),
    ]);

    uniqueDomains.value = domainsResponse.data;
    uniqueLocations.value = locationsResponse.data;
    uniqueEventTypes.value = typesResponse.data;
    uniqueStarRatings.value = ratingsResponse.data;
  } catch (error) {
    console.error('Error fetching unique filters:', error);
  }
};

// Fetch industry experts based on filters
const fetchIndustryExperts = async (filters = {}) => {
  try {
    const query = new URLSearchParams({ ...filters, limit: 10, page: page.value }).toString(); // Use page.value
    const response = await axios.get(`http://localhost:3000/api/industry-experts/experts?${query}`);
    industryExperts.value = response.data;
    console.log('Fetched Industry Experts:', industryExperts.value);
  } catch (error) {
    console.error('Error fetching industry experts:', error);
  }
};

// Search for industry experts based on filters
const searchIndustryExperts = () => {
  const filters = {
    startDate: startDate.value || undefined,
    endDate: endDate.value || undefined,
    domainOfExpertise: selectedDomain.value || undefined,
    companyAddress: selectedLocation.value || undefined,
    eventType: selectedEventType.value || undefined,
    rating: selectedStarRating.value || undefined,
  };

  fetchIndustryExperts(Object.fromEntries(Object.entries(filters).filter(([_, v]) => v)));
};

// Clear filters and fetch all industry experts
const clearFilters = () => {
  startDate.value = '';
  endDate.value = '';
  selectedDomain.value = '';
  selectedLocation.value = '';
  selectedEventType.value = '';
  selectedStarRating.value = '';
  fetchIndustryExperts();
};

const exportToExcel = () => {
  // Start with the base filename
  let filename = 'Industryexpert';

  // Append domain if selected
  if (selectedDomain.value) {
    filename += `_${selectedDomain.value}`;
  }

  // Append location if selected
  if (selectedLocation.value) {
    filename += `_${selectedLocation.value}`;
  }

  // Append the date range if either startDate or endDate is selected
  if (startDate.value || endDate.value) {
    const start = startDate.value ? startDate.value : 'start';
    const end = endDate.value ? endDate.value : 'end';
    filename += `_${start}_to_${end}`;
  }

  // Append the file extension
  filename += '.xlsx';

  // Create the worksheet from the industry experts data
  const worksheet = XLSX.utils.json_to_sheet(industryExperts.value.map((expert, index) => ({
    'S.No': index + 1,
    'First Name': expert.firstname,
    'Last Name': expert.lastname,
    'Domain': expert.domainOfExpertise || 'N/A',
    'Company': expert.companyName || 'N/A',
    'Event Type': expert.eventType || 'N/A',
    'Event Date': formatDate(expert.eventDate),
    'Star Rating': expert.rating || 'N/A',
  })));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Industry Experts');

  // Write the file with the dynamic filename
  XLSX.writeFile(workbook, filename);
};

const formatDate = (date) => new Date(date).toLocaleDateString();

const editIndustryExpert = (id) => {
  router.push({ name: 'EditIndustryExpert', params: { id } }); // Navigate to edit page
};
</script>


<style scoped>
.grid {
  gap: 4px;
}

button {
  @apply text-sm;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  @apply bg-gray-200 sticky top-0 z-10 text-black;
  /* Ensure header text is black */
}

th,
td {
  @apply border px-3 py-2 text-left;
}

td {
  color: black;
  /* Ensure table data text is black */
}

button {
  @apply text-sm px-3 py-1;
}

.star {
  font-size: 24px;
  /* Ensure size is consistent */
  cursor: pointer;
  /* Change cursor on hover */
  transition: color 0.2s ease;
  /* Smooth transition */
}

.star:hover {
  color: #FFD700;
  /* Change color on hover */
}
</style>
