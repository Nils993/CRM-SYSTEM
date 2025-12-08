<script setup lang="ts">
import type { ICard, IColumn } from "~/components/kanban/kanban.types";
import { useKanbanQuery } from "~/components/kanban/useKanbanQuery";
import Card from "~/components/ui/card/Card.vue";
import CardContent from "~/components/ui/card/CardContent.vue";
import CardFooter from "~/components/ui/card/CardFooter.vue";
import CardHeader from "~/components/ui/card/CardHeader.vue";
useSeoMeta({
  title: "Home | CRM System",
});
const dragCard = ref<ICard | null>(null);
const sourceCollumn = ref<IColumn | null>(null);
const { data, isLoading, refetch } = useKanbanQuery();
</script>

<template>
  <div>
    <h1 class="text-white text-2xl text-center font-bold mb-10">CRM SYSTEM</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <Card class="mb-3 dark" draggable="true">
        <CardHeader role="button">Name card</CardHeader>
        <CardContent>Компания</CardContent>
        <CardFooter>Date</CardFooter>
      </Card>
    </div>
  </div>
</template>
