<script setup lang="ts">
const store = useDealSlideStore();
</script>
<template>
  <USlideover class="bg-gray-800" v-model:open="store.isOpen">
    <template #body
      ><KanbanSlideoverTop></KanbanSlideoverTop>
      <KanbanSlideoverComments></KanbanSlideoverComments
    ></template>
  </USlideover>
</template>
