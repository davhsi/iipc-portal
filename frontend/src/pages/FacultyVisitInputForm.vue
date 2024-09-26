<template>
  <div class="flex min-h-screen">
    <main class="w-4/5 bg-gray-50 p-8">
      <h1 class="text-3xl font-bold mb-6">{{ isEditing ? 'Edit Faculty Visit' : 'New Faculty Visit' }}</h1>

      <form class="bg-white p-8 shadow-md rounded-lg" @submit.prevent="submitForm">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <!-- Input Fields Here -->
          <div>
            <label class="block mb-2 text-sm font-bold">First Name *</label>
            <input v-model="firstname" type="text" class="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter first name" required />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Last Name *</label>
            <input v-model="lastname" type="text" class="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter last name" required />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Faculty ID *</label>
            <input v-model="facultyid" type="text" class="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter faculty ID" required />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Phone *</label>
            <input v-model="phone" type="text" class="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter phone number" required />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Email *</label>
            <input v-model="mailid" type="email" class="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter email" required />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Event *</label>
            <input v-model="event" type="text" class="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter event" required />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Type of Event *</label>
            <input v-model="typeevent" type="text" class="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter type of event" required />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Date *</label>
            <input v-model="eventDate" type="date" class="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Event Location *</label>
            <input v-model="eventLocation" type="text" class="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter event location" required />
          </div>
          <div>
            <label class="block mb-2 text-sm font-bold">Event Organizer *</label>
            <input v-model="eventOrganizer" type="text" class="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter event organizer" required />
          </div>
        </div>

        <div class="flex justify-between">
          <button type="submit" class="w-1/2 bg-blue-600 text-white p-2 rounded" :disabled="loading">
            {{ isEditing ? 'Update' : 'Save' }} {{ loading ? '...' : '' }}
          </button>
          <!-- Delete button -->
          <button type="button" class="w-1/2 bg-red-600 text-white p-2 rounded ml-4" @click="deleteVisit" v-if="isEditing"
            :disabled="loading">
            Delete
          </button>
        </div>
      </form>
    </main>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const firstname = ref('');
const lastname = ref('');
const facultyid = ref('');
const phone = ref('');
const mailid = ref('');
const event = ref('');
const typeevent = ref('');
const eventDate = ref('');
const eventLocation = ref('');
const eventOrganizer = ref('');
const isEditing = ref(false);
const loading = ref(false);

const router = useRouter();
const route = useRoute();

const fetchVisitData = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/faculty-visits/${id}`);
    if (!response.ok) {
      throw new Error('Error fetching visit data');
    }
    const visit = await response.json();

    firstname.value = visit.firstname;
    lastname.value = visit.lastname;
    facultyid.value = visit.facultyid;
    phone.value = visit.phone;
    mailid.value = visit.mailid;
    event.value = visit.event;
    typeevent.value = visit.typeevent;
    eventDate.value = visit.eventDate.split('T')[0]; // Format to yyyy-MM-dd
    eventLocation.value = visit.eventLocation;
    eventOrganizer.value = visit.eventOrganizer;
  } catch (error) {
    console.error('Error fetching visit data:', error);
    alert('Failed to load visit data');
  }
};

const submitForm = async () => {
  loading.value = true; // Show loading indicator
  try {
    const formData = {
      firstname: firstname.value,
      lastname: lastname.value,
      facultyid: facultyid.value,
      phone: phone.value,
      mailid: mailid.value,
      event: event.value,
      typeevent: typeevent.value,
      eventDate: new Date(eventDate.value), // Convert to Date object
      eventLocation: eventLocation.value,
      eventOrganizer: eventOrganizer.value,
    };

    console.log('Form data being sent:', formData);

    const url = isEditing.value
      ? `http://localhost:3000/api/faculty-visits/${route.params.id}`
      : 'http://localhost:3000/api/faculty-visits';

    const response = await fetch(url, {
      method: isEditing.value ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error details:', errorResponse);
      throw new Error(errorResponse.message || 'Failed to submit form');
    }

    alert('Visit submitted successfully!');
    router.push('/dashboard/faculty-visit');
  } catch (error) {
    console.error('Failed to submit form:', error);
    alert(`Error: ${error.message}`);
  } finally {
    loading.value = false; // Hide loading indicator
  }
};
const deleteVisit = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this visit?');
    if (!confirmDelete) return;

    loading.value = true; // Show loading indicator
    try {
        console.log('Deleting visit with ID:', route.params.id); // Debug log
        const response = await fetch(`http://localhost:3000/api/faculty-visits/${route.params.id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error('Error details:', errorResponse);
            throw new Error(errorResponse.message || 'Failed to delete visit');
        }

        alert('Visit deleted successfully!');
        router.push('/dashboard/faculty-visit');
    } catch (error) {
        console.error('Failed to delete visit:', error);
        alert(`Error: ${error.message}`);
    } finally {
        loading.value = false; // Hide loading indicator
    }
};



onMounted(() => {
  if (route.params.id) {
    isEditing.value = true;
    fetchVisitData(route.params.id);
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
