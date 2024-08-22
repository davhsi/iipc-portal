<template>
    <div class="h-screen w-64 bg-blue-600 text-white flex flex-col justify-between">
      <div class="p-4">
        <img src="../assets/vue.svg" alt="IIPC Logo" class="w-20 mb-6 mx-auto" />
        <h2 class="text-xl font-bold mb-4">Dashboard</h2>
        <nav>
          <ul>
            <li class="mb-3">
              <router-link to="/dashboard/industry-expert" class="flex items-center space-x-3">
                <span class="material-icons">business</span>
                <span>Industry Experts</span>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/faculty-visit" class="flex items-center space-x-3">
                <span class="material-icons">people</span>
                <span>Faculty Visits</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="p-4">
        <router-link to="/" class="flex items-center space-x-3">
          <span class="material-icons">logout</span>
          <span>Log out</span>
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .material-icons {
    font-size: 1.5rem;
  }
  </style>
    