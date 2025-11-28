<script setup lang="ts"></script>
<template>
  <div>
    <Sidebar></Sidebar>
    <div><slot></slot></div>
  </div>
</template>
<style scoped>
.grid {
  display: grid;
}
</style>
