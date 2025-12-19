<script setup lang="ts">
const store = useDealSlideStore();
</script>
<template>
  <USlideover v-model:open="store.isOpen">
    <template #header><KanbanSlideoverTop></KanbanSlideoverTop></template>
    <KanbanSlideoverComments></KanbanSlideoverComments>
  </USlideover>
</template>
<style scoped></style>
