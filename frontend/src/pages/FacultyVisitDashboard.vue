<template>
  <div class="h-screen flex flex-col">
    <!-- Heading and New Button -->
    <div class="flex justify-between items-center mb-4">
      <Header title="Faculty Visits Dashboard" />
      <NewButton />
    </div>

    <!-- Search Filters Section (Static) -->
    <div class="bg-white p-4 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-4 text-black">Search Filters</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Event Location -->
        <div>
          <label class="block mb-1 font-medium text-black">Event Location:</label>
          <select v-model="selectedEventLocation" class="border p-2 rounded w-full text-black">
            <option value="">Choose Location</option>
            <option v-for="location in uniqueEventLocations" :key="location" :value="location">{{ location }}</option>
          </select>
        </div>
        <!-- Event Type -->
        <div>
          <label class="block mb-1 font-medium text-black">Event Type:</label>
          <select v-model="selectedEventType" class="border p-2 rounded w-full text-black">
            <option value="">Choose Event Type</option>
            <option v-for="type in uniqueEventTypes" :key="type" :value="type">{{ type }}</option>
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
      </div>

      <!-- Search, Clear, and Export Buttons -->
      <div class="flex justify-start items-center space-x-2 mt-4">
        <button @click="searchFacultyVisits" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm">
          Search
        </button>
        <button @click="clearFilters" class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition text-sm">
          Clear
        </button>
        <button class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-sm">
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
            <th class="px-3 py-2 text-left text-black">Event</th>
            <th class="px-3 py-2 text-left text-black">Event Type</th>
            <th class="px-3 py-2 text-left text-black">Event Date</th>
            <th class="px-3 py-2 text-left text-black">Location</th>
            <th class="px-3 py-2 text-left text-black">Organizer</th>
            <th class="px-3 py-2 text-center text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(visit, index) in facultyVisits" :key="visit._id" class="hover:bg-gray-50">
            <td class="border-t px-3 py-2 text-black">{{ index + 1 }}</td>
            <td class="border-t px-3 py-2 text-black">{{ visit.firstname }}</td>
            <td class="border-t px-3 py-2 text-black">{{ visit.lastname }}</td>
            <td class="border-t px-3 py-2 text-black">{{ visit.event }}</td>
            <td class="border-t px-3 py-2 text-black">{{ visit.typeevent }}</td>
            <td class="border-t px-3 py-2 text-black">{{ formatDate(visit.eventDate) }}</td>
            <td class="border-t px-3 py-2 text-black">{{ visit.eventLocation }}</td>
            <td class="border-t px-3 py-2 text-black">{{ visit.eventOrganizer }}</td>
            <td class="border-t px-4 py-2 text-center">
              <button
                class="bg-blue-500 text-white py-1 px-2 rounded mr-2 hover:bg-blue-600 transition"
                @click="$emit('edit', visit._id)"
              >
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
import Header from '../components/Header.vue';
import NewButton from '../components/NewButton.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const facultyVisits = ref([]);
const startDate = ref('');
const endDate = ref('');
const selectedEventLocation = ref('');
const selectedEventType = ref('');
const uniqueEventLocations = ref([]);
const uniqueEventTypes = ref([]);

onMounted(async () => {
  await fetchUniqueFilters();
  await fetchFacultyVisits();
});

const fetchUniqueFilters = async () => {
  try {
    const [locationsResponse, typesResponse] = await Promise.all([
      axios.get('http://localhost:3000/api/faculty-visits/event-locations'),
      axios.get('http://localhost:3000/api/faculty-visits/event-types'),
    ]);

    uniqueEventLocations.value = locationsResponse.data;
    uniqueEventTypes.value = typesResponse.data;
  } catch (error) {
    console.error('Error fetching unique filters:', error);
  }
};

const fetchFacultyVisits = async (filters = {}) => {
  try {
    const response = await axios.post('http://localhost:3000/api/faculty-visits', filters);
    facultyVisits.value = response.data;
  } catch (error) {
    console.error('Error fetching faculty visits:', error);
  }
};

const searchFacultyVisits = () => {
  const filters = {
    startDate: startDate.value || undefined,
    endDate: endDate.value || undefined,
    eventLocation: selectedEventLocation.value || undefined,
    typeevent: selectedEventType.value || undefined,
  };

  fetchFacultyVisits(Object.fromEntries(Object.entries(filters).filter(([_, v]) => v)));
};

const clearFilters = () => {
  startDate.value = '';
  endDate.value = '';
  selectedEventLocation.value = '';
  selectedEventType.value = '';
  fetchFacultyVisits();
};

const deleteFacultyVisit = async (visitId) => {
  if (confirm('Are you sure you want to delete this visit?')) {
    try {
      await axios.delete(`http://localhost:3000/api/faculty-visits/${visitId}`);
      fetchFacultyVisits();
    } catch (error) {
      console.error('Error deleting faculty visit:', error);
    }
  }
};

const formatDate = (date) => new Date(date).toLocaleDateString();
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
  @apply bg-gray-200 sticky top-0 z-10 text-black; /* Ensure header text is black */
}

th, td {
  @apply border px-3 py-2 text-left;
}

td {
  color: black; /* Ensure table data text is black */
}

button {
  @apply text-sm px-3 py-1;
}
</style>
