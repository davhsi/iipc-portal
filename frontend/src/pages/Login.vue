<template>
  <div class="min-h-screen flex justify-center items-center bg-dark-800">
    <div class="bg-dark-700 p-8 rounded-lg shadow-lg text-center">
      <h2 class="text-xl font-semibold text-gray-300 mb-2">Welcome Back!</h2>
      <img src="../assets/login.png" alt="Logo" class="mx-auto mb-4" />
      <p class="text-white text-lg font-bold">BANNARI AMMAN INSTITUTE OF TECHNOLOGY</p>
      <p class="text-gray-400 mb-4">Stay Ahead</p>
      <p class="text-gray-500 mb-4">IIPC BIT</p>

      <!-- Input fields with Tailwind CSS classes -->
      <input 
        v-model="email" 
        type="email" 
        placeholder="Email" 
        class="mb-4 p-2 w-full rounded bg-dark-800 text-white placeholder-gray-500 border border-gray-600"
      />
      <input 
        v-model="password" 
        type="password" 
        placeholder="Password" 
        class="mb-4 p-2 w-full rounded bg-dark-800 text-white placeholder-gray-500 border border-gray-600"
      />

      <hr class="my-4 border-gray-500" />

      <button
        @click="login"
        class="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
      >
        Login
      </button>

      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // For navigation after login

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/login', {
      email: email.value,
      password: password.value,
    });
    console.log(response.data.message);
    // Handle successful login
    // For example, store token or user info, and redirect to dashboard
    localStorage.setItem('authToken', response.data.token); // Store token if needed
    router.push('/dashboard'); // Redirect to dashboard or appropriate route
  } catch (error) {
    // Handle error and update the error message
    errorMessage.value = error.response?.data?.message || 'An error occurred';
  }
};
</script>

<style scoped>
/* Scoped styles if any */
</style>
