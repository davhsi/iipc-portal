<template>
  <div class="h-screen w-64 bg-blue-800 text-gray-100 flex flex-col">
    <!-- Logo and Title -->
    <div class="p-5 flex flex-col items-center border-b border-blue-700">
      <img src="../assets/login.png" alt="IIPC Logo" class="w-32 h-24 mb-4" />
      <h2 class="text-xl font-semibold mb-4 text-center tracking-wide">Dashboard</h2>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-grow">
      <ul class="space-y-2 p-5">
        <li>
          <router-link 
            to="/dashboard/industry-expert" 
            class="flex items-center space-x-4 p-3 rounded transition-colors hover:bg-blue-700"
            :class="{ 'bg-blue-900': $route.path === '/dashboard/industry-expert' }"
          >
            <i class="fas fa-user-tie text-lg"></i> 
            <span class="text-lg">Industry Experts</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/dashboard/faculty-visit" 
            class="flex items-center space-x-4 p-3 rounded transition-colors hover:bg-blue-700"
            :class="{ 'bg-blue-900': $route.path === '/dashboard/faculty-visit' }"
          >
            <i class="fas fa-chalkboard-teacher text-lg"></i>
            <span class="text-lg">Faculty Visits</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Logout Button -->
    <div class="p-5 border-t border-blue-700">
      <router-link 
        to="/" 
        class="flex items-center space-x-4 p-3 rounded transition-colors hover:bg-blue-700"
      >
        <i class="fas fa-sign-out-alt text-lg"></i> 
        <span class="text-lg">Log out</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>

a.active {
  background-color: #1e3a8a; 
}


a:hover {
  background-color: #2b4d8d; 
}


h2 {
  color: #e2e8f0; 
}


@media (max-width: 768px) {
  .h-screen {
    height: auto;
  }
}
</style>
