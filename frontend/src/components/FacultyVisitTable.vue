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
import { defineProps } from 'vue';

const props = defineProps({
  visits: {
    type: Array,
    required: true
  }
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

button {
  cursor: pointer;
}

.text-yellow-400 {
  color: #fbbf24;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
}

.fas {
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

.bg-red-500 {
  background-color: #ef4444; 
}

.bg-red-600 {
  background-color: #dc2626; 
}
</style>
