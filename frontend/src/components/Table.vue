<template>
  <table class="min-w-full bg-white">
    <thead>
      <tr>
        <th class="py-2 px-4 bg-gray-200 text-left">First Name</th>
        <th class="py-2 px-4 bg-gray-200 text-left">Last Name</th>
        <th class="py-2 px-4 bg-gray-200 text-left">Domain of Expertise</th>
        <th class="py-2 px-4 bg-gray-200 text-left">Company</th>
        <th class="py-2 px-4 bg-gray-200 text-left">Location</th>
        <th class="py-2 px-4 bg-gray-200 text-left">Last Visited</th>
        <th class="py-2 px-4 bg-gray-200 text-left">Actions</th>

      </tr>
    </thead>
    <tbody>
      <tr v-for="expert in data" :key="expert._id">
        <td class="border px-4 py-2">{{ expert.firstname }}</td>
        <td class="border px-4 py-2">{{ expert.lastname }}</td>
        <td class="border px-4 py-2">{{ expert.domainOfExpertise }}</td>
        <td class="border px-4 py-2">{{ expert.companyName }}</td>
        <td class="border px-4 py-2">{{ expert.companyAddress }}</td>
        <td class="border px-4 py-2">{{ expert.eventDate }}</td>


        <td class="border px-4 py-2">
          <button
            class="bg-green-500 text-white py-1 px-2 rounded mr-2"
            @click="$emit('edit', expert._id)"
          >
            Edit
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  data: {
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
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}

button {
  cursor: pointer;
}
</style>
