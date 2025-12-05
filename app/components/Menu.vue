<script setup lang="ts">
const menuStore = useMenuStore();
</script>
<template>
  <div>
    <NuxtLink
      v-for="item in menuStore.MENU_DATA"
      :key="item.name"
      :to="item.url"
      class="flex items-center py-1 rounded-lg w-full hover:bg-gray-700 hover:shadow transition-all mb-2"
    >
      <Icon :name="item.name" />
      <span class="mx-2">{{ item.name }}</span></NuxtLink
    >
  </div>
</template>

<style scoped></style>
