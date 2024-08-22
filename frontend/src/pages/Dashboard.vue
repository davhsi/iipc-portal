<template>
    <div class="flex">
      <Sidebar />
      <div class="flex-grow bg-gray-100 p-8">
        <router-view />
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '../components/Sidebar.vue';
  </script>
  