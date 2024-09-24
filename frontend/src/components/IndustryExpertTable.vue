<template>
  <div>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th class="py-3 px-4 bg-gray-100 text-left font-semibold text-gray-600">First Name</th>
            <th class="py-3 px-4 bg-gray-100 text-left font-semibold text-gray-600">Last Name</th>
            <th class="py-3 px-4 bg-gray-100 text-left font-semibold text-gray-600">Domain of Expertise</th>
            <th class="py-3 px-4 bg-gray-100 text-left font-semibold text-gray-600">Company</th>
            <th class="py-3 px-4 bg-gray-100 text-left font-semibold text-gray-600">Location</th>
            <th class="py-3 px-4 bg-gray-100 text-left font-semibold text-gray-600">Coordinator</th>
            <th class="py-3 px-4 bg-gray-100 text-left font-semibold text-gray-600">Last Visited</th>
            <th class="py-3 px-4 bg-gray-100 text-left font-semibold text-gray-600">Rating</th>
            <th class="py-3 px-4 bg-gray-100 text-left font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="expert in data" :key="expert._id" class="hover:bg-gray-50">
            <td class="border-t px-4 py-2">{{ expert.firstname }}</td>
            <td class="border-t px-4 py-2">{{ expert.lastname }}</td>
            <td class="border-t px-4 py-2">{{ expert.domainOfExpertise }}</td>
            <td class="border-t px-4 py-2">{{ expert.companyName }}</td>
            <td class="border-t px-4 py-2">{{ expert.companyAddress }}</td>
            <td class="border-t px-4 py-2">{{ expert.eventCoordinator }}</td>
            <td class="border-t px-4 py-2">{{ formatDate(expert.eventDate) }}</td>
            <td class="border-t px-4 py-2">
              <span class="inline-flex">
                <i v-for="n in 5" :key="n" class="fas" :class="n <= expert.rating ? 'fa-star' : 'fa-star-o'" :style="starStyle(n, expert.rating)"></i>
              </span>
            </td>
            <td class="border-t px-4 py-2 text-center">
              <button
                class="bg-blue-500 text-white py-1 px-2 rounded mr-2 hover:bg-blue-600 transition"
                @click="$emit('edit', expert._id)"
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
import * as XLSX from 'xlsx';
import { defineProps } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const starStyle = (n, rating) => {
  return {
    color: n <= rating ? '#fbbf24' : '#e5e7eb', 
    transition: 'color 0.2s ease-in-out'
  };
};


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

button {
  cursor: pointer;
}

.text-yellow-400 {
  color: #fbbf24;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
}

.fas.fa-star, .fas.fa-star-o {
  font-size: 1.25rem;
}

.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}

.transition {
  transition: background-color 0.2s ease;
}

.bg-blue-500 {
  background-color: #3b82f6; 
}

.bg-blue-600 {
  background-color: #2563eb; 
}
</style>
