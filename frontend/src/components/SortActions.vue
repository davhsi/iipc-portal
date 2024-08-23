<template>
  <div class="flex items-center space-x-4">
    <div class="flex items-center space-x-2">
      <span>Sort:</span>
      <select v-model="sortOption" class="border rounded px-4 py-2">
        <option value="mostRecent">Most Recent</option>
        <!-- Add other sort options if needed -->
      </select>
    </div>
    <button @click="exportToExcel" class="flex items-center bg-gray-200 p-2 rounded text-black">
      <i class="fas fa-download mr-2 text-black"></i>
      <span class="text-black">Export</span>
    </button>
    <button class="bg-gray-200 p-2 rounded">
      <i class="fas fa-ellipsis-v"></i>
    </button>
  </div>
</template>

<script setup>
import * as XLSX from 'xlsx';
import { defineProps, ref } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});

const sortOption = ref('mostRecent');

const exportToExcel = () => {
  if (!props.data || props.data.length === 0) {
    alert('No data available to export.');
    return;
  }

  const ws = XLSX.utils.json_to_sheet(props.data.map(expert => ({
    'First Name': expert.firstname,
    'Last Name': expert.lastname,
    'Domain of Expertise': expert.domainOfExpertise,
    'Company': expert.companyName,
    'Location': expert.companyAddress,
    'Coordinator': expert.eventCoordinator,
    'Last Visited': formatDate(expert.eventDate),
    'Rating': expert.rating
  })));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Experts');
  XLSX.writeFile(wb, 'experts.xlsx');
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
