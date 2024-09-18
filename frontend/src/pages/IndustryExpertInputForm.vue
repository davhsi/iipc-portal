<template>
  <div class="flex min-h-screen">
    <!-- Main Content -->
    <main class="w-4/5 bg-gray-50 p-8">
      <h1 class="text-3xl font-bold mb-6">{{ isEditing ? 'Edit Industry Expert' : 'New Industry Expert' }}</h1>

      <!-- Form -->
      <form class="bg-white p-8 shadow-md rounded-lg" @submit.prevent="submitForm">
        <!-- Personal Details -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block mb-2 text-sm font-bold">Firstname *</label>
            <input v-model="firstname" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Enter firstname" />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Lastname *</label>
            <input v-model="lastname" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Enter lastname" />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Phone Number *</label>
            <input v-model="phoneNumber" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Enter phone number" />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Mail ID *</label>
            <input v-model="mailId" type="email" class="w-full p-2 border border-gray-300 rounded" placeholder="Enter mail ID" />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Domain of Expertise *</label>
            <input v-model="domainOfExpertise" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Enter domain" />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Is an Alumnus of BIT? *</label>
            <div class="flex">
              <label class="mr-4"><input v-model="alumnusOfBIT" type="radio" name="alumnus" value="Yes" class="mr-2"> Yes</label>
              <label><input v-model="alumnusOfBIT" type="radio" name="alumnus" value="No" class="mr-2"> No</label>
            </div>
          </div>
        </div>

        <!-- Company Details -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block mb-2 text-sm font-bold">Company Name *</label>
            <input v-model="companyName" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Enter company name" />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Company Address *</label>
            <input v-model="companyAddress" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Enter company address" />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Phone Number *</label>
            <input v-model="companyPhoneNumber" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Enter phone number" />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Mail ID *</label>
            <input v-model="companyMailId" type="email" class="w-full p-2 border border-gray-300 rounded" placeholder="Enter mail ID" />
          </div>
        </div>

        <!-- Event Details -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block mb-2 text-sm font-bold">Date *</label>
            <input v-model="eventDate" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="DD/MM/YYYY" />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Type of Event *</label>
            <input v-model="eventType" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Enter event type" />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Event Coordinator *</label>
            <input v-model="eventCoordinator" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Enter coordinator name" />
          </div>
        </div>

        <!-- Rating -->
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold">Rate the Overall Experience:</label>
          <div class="flex">
            <span v-for="star in 5" :key="star" class="text-2xl" @click="rating = star" :class="star <= rating ? 'text-yellow-500' : 'text-gray-300'">★</span>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded">
            {{ isEditing ? 'Update' : 'Save' }}
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';

import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const firstname = ref('');
const lastname = ref('');
const phoneNumber = ref('');
const mailId = ref('');
const domainOfExpertise = ref('');
const alumnusOfBIT = ref('');
const companyName = ref('');
const companyAddress = ref('');
const companyPhoneNumber = ref('');
const companyMailId = ref('');
const eventDate = ref('');
const eventType = ref('');
const eventCoordinator = ref('');
const rating = ref(0);

const router = useRouter();
const route = useRoute();
const isEditing = ref(false);

const fetchExpertData = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/experts/${id}`);
    const expert = await response.json();

    // Populate fields with existing data
    firstname.value = expert.firstname;
    lastname.value = expert.lastname;
    phoneNumber.value = expert.phoneNumber;
    mailId.value = expert.mailId;
    domainOfExpertise.value = expert.domainOfExpertise;
    alumnusOfBIT.value = expert.alumnusOfBIT;
    companyName.value = expert.companyName;
    companyAddress.value = expert.companyAddress;
    companyPhoneNumber.value = expert.companyPhoneNumber;
    companyMailId.value = expert.companyMailId;
    eventDate.value = expert.eventDate;
    eventType.value = expert.eventType;
    eventCoordinator.value = expert.eventCoordinator;
    rating.value = expert.rating;
  } catch (error) {
    console.error('Error fetching expert data:', error);
  }
};

async function submitForm() {
  try {
    // Create formData object
    const formData = {
      firstname: firstname.value,
      lastname: lastname.value,
      phoneNumber: phoneNumber.value,
      mailId: mailId.value,
      domainOfExpertise: domainOfExpertise.value,
      alumnusOfBIT: alumnusOfBIT.value,
      companyName: companyName.value,
      companyAddress: companyAddress.value,
      companyPhoneNumber: companyPhoneNumber.value,
      companyMailId: companyMailId.value,
      eventDate: eventDate.value,
      eventType: eventType.value,
      eventCoordinator: eventCoordinator.value,
      rating: rating.value
    };

    const url = isEditing.value
      ? `http://localhost:3000/api/experts/${route.params.id}`
      : 'http://localhost:3000/api/experts';
    
    const response = await fetch(url, {
      method: isEditing.value ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    // Success handling: show success message and redirect
    alert('Expert updated successfully!');
    router.push('/dashboard/industry-expert');
  } catch (error) {
    console.error(error);
    alert('Failed to submit form');
  }
}

// If editing, fetch existing data
onMounted(() => {
  if (route.params.id) {
    isEditing.value = true;
    fetchExpertData(route.params.id);
  }
});
</script>

<style scoped>
body,
h1,
label,
input {
  color: black;
}
</style>
