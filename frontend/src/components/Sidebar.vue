<template>
  <div class="h-screen w-64 bg-blue-700 text-gray-100 flex flex-col justify-between">
    <div class="p-5">
      <img src="../assets/login.png" alt="IIPC Logo" class="w-34 h-28 mb-8 mx-auto" />
      <h2 class="text-xl font-semibold mb-8 text-center tracking-wide">Dashboard</h2>
      <nav>
        <ul>
          <li class="mb-4">
            <router-link 
              to="/dashboard/industry-expert" 
              class="flex items-center space-x-4 hover:bg-blue-800 p-3 rounded transition-all"
              active-class="bg-blue-900"
            >
              <span class="text-lg">Industry Experts</span>
            </router-link>
          </li>
          <li>
            <router-link 
              to="/dashboard/faculty-visit" 
              class="flex items-center space-x-4 hover:bg-blue-800 p-3 rounded transition-all"
              active-class="bg-blue-900"
            >
              <span class="text-lg">Faculty Visits</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="p-5">
      <router-link 
        to="/" 
        class="flex items-center space-x-4 hover:bg-blue-800 p-3 rounded transition-all"
      >
        <span class="text-lg">Log out</span>
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

ul li a {
  transition: background-color 0.3s ease;
}

ul li a.active {
  background-color: #1c3aa9; /* Even darker shade for active link */
}

ul li a:hover {
  background-color: #285df7; /* Lighter blue shade on hover */
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05rem;
  color: #e2e8f0; /* Lighter color for heading */
}
</style>
