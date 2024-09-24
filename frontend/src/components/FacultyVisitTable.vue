<template>
    <div>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th class="py-3 px-4 bg-gray-100 text-left font-semibold text-gray-600">First Name</th>
              <th class="py-3 px-4 bg-gray-100 text-left font-semibold text-gray-600">Last Name</th>
              <th class="py-3 px-4 bg-gray-100 text-left font-semibold text-gray-600">Event</th>
              <th class="py-3 px-4 bg-gray-100 text-left font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="visit in visits" :key="visit._id" class="hover:bg-gray-50">
              <td class="border-t px-4 py-2 text-black">{{ visit.firstname }}</td>
              <td class="border-t px-4 py-2 text-black">{{ visit.lastname }}</td>
              <td class="border-t px-4 py-2 text-black">{{ visit.event }}</td>
              <td class="border-t px-4 py-2 text-center">
                <router-link :to="`/dashboard/faculty-visit/edit/${visit._id}`" class="bg-blue-500 text-white py-1 px-2 rounded mr-2 hover:bg-blue-600 transition">Edit</router-link>
                <button @click="deleteVisit(visit._id)" class="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const visits = ref([]);
const router = useRouter();

const fetchVisits = async () => {
    const response = await fetch('http://localhost:3000/api/faculty-visits');
    visits.value = await response.json();
};

const deleteVisit = async (id) => {
    if (confirm('Are you sure you want to delete this visit?')) {
        await fetch(`http://localhost:3000/api/faculty-visits/${id}`, {
            method: 'DELETE',
        });
        fetchVisits(); // Refresh the visits list after deletion
    }
};

onMounted(() => {
    fetchVisits();
});
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #e5e7eb;
    padding: 12px;
}

th {
    background-color: #f9fafb;
}

td {
    color: black; /* Set table cell text color to black */
}

button {
    cursor: pointer;
}

.hover\:bg-gray-50:hover {
    background-color: #f9fafb;
}

.bg-blue-500 {
    background-color: #3b82f6; 
}

.bg-blue-600 {
    background-color: #2563eb; 
}

.bg-red-500 {
    background-color: #ef4444; 
}

.bg-red-600 {
    background-color: #dc2626; 
}
</style>
