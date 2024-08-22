<template>
    <div>
      <Header title="Industry Experts Dashboard" />
      <div class="mt-6">
        <Table :data="tableData" />
      </div>
    </div>
  </template>
  
  <script setup>
  import Header from '../components/Header.vue';
  import Table from '../components/Table.vue';
  
  </script>
  