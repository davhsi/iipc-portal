<template>
  <div class="min-h-screen flex justify-center items-center bg-dark-900">
    <div class="bg-dark-800 p-10 rounded-lg shadow-lg text-center w-full max-w-md">
      <h2 class="text-3xl font-semibold text-gray-100 mb-6">Welcome Back!</h2>
      <img src="../assets/login.png" alt="Logo" class="mx-auto mb-6 w-56 h-36 object-cover" />
      <p class="text-gray-300 text-lg font-semibold mb-4">BANNARI AMMAN INSTITUTE OF TECHNOLOGY</p>
      <p class="text-gray-400 mb-6">Stay Ahead</p>
      <p class="text-gray-500 mb-8">IIPC BIT</p>

      <!-- Input fields with Tailwind CSS classes -->
      <input 
        v-model="email" 
        type="email" 
        placeholder="Email" 
        class="mb-4 p-3 w-full rounded-lg bg-dark-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input 
        v-model="password" 
        type="password" 
        placeholder="Password" 
        class="mb-6 p-3 w-full rounded-lg bg-dark-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <hr class="my-6 border-gray-600" />

      <button
        @click="login"
        class="w-full bg-blue-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out flex items-center justify-center"
      >
        <span v-if="loading" class="animate-spin inline-block w-5 h-5 border-4 border-t-4 border-blue-300 border-solid rounded-full"></span>
        <span v-else>Login</span>
      </button>

      <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);
const router = useRouter();

const login = async () => {
  loading.value = true;
  try {
    const response = await axios.post('http://localhost:3000/login', {
      email: email.value,
      password: password.value,
    });
    console.log(response.data.message);
    localStorage.setItem('authToken', response.data.token);
    router.push('/dashboard');
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'An error occurred';
  } finally {
    loading.value = false;
  }
};
</script>


<style scoped>
/* Scoped styles if any */
</style>
