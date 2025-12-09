<script setup lang="ts">
import type { ICard, IColumn } from "~/components/kanban/kanban.types";
import { useKanbanQuery } from "~/components/kanban/useKanbanQuery";
import Card from "~/components/ui/card/Card.vue";
import CardContent from "~/components/ui/card/CardContent.vue";
import CardFooter from "~/components/ui/card/CardFooter.vue";
import CardHeader from "~/components/ui/card/CardHeader.vue";
import CardDescription from "~/components/ui/card/CardDescription.vue";
import { convertCurrency } from "@/utils/convertCurrency";
import dayjs from "dayjs";
useSeoMeta({
  title: "Home | CRM System",
});
const dragCard = ref<ICard | null>(null);
const sourceCollumn = ref<IColumn | null>(null);
const { data, isLoading, refetch } = useKanbanQuery();
console.log(data.value);
</script>

<template>
  <div>
    <h1 class="text-white text-2xl text-center font-bold mb-10">CRM SYSTEM</h1>
    <div v-if="isLoading" class="text-white">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div v-for="(column, index) in data" :key="column.id">
          <div class="rounded bg-gray-700 py-1 px-5 mb-2 text-center">
            {{ column.name }}
          </div>
          <div>
            <Card
              v-for="item in column.items"
              :key="item.id"
              class="mb-3 dark"
              draggable="true"
            >
              <CardHeader role="button">{{ item.name }}</CardHeader>
              <CardDescription>{{
                convertCurrency(item.price)
              }}</CardDescription>
              <CardContent>{{ item.companyName }}</CardContent>
              <CardFooter>{{
                dayjs(item.$createdAt).format("DD MMMM YYYY")
              }}</CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
