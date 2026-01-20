<script setup lang="ts">
import type { ICard, IColumn } from "~/components/kanban/kanban.types";
import { useKanbanQuery } from "~/components/kanban/useKanbanQuery";
import Card from "~/components/ui/card/Card.vue";
import CardContent from "~/components/ui/card/CardContent.vue";
import CardFooter from "~/components/ui/card/CardFooter.vue";
import CardHeader from "~/components/ui/card/CardHeader.vue";
import CardDescription from "~/components/ui/card/CardDescription.vue";
import { convertCurrency } from "@/utils/convertCurrency";
import CreateDeal from "~/components/kanban/CreateDeal.vue";
import dayjs from "dayjs";
import type { EnumStatus } from "~/typse/deals.types";
import { useMutation } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "@/utils/app.constants";
import { generateColumnStyle } from "~/components/kanban/generate-gradient";
import CardTitle from "~/components/ui/card/CardTitle.vue";
import { useDealSlideStore } from "@/stores/dealslideStore";

useSeoMeta({
  title: "Home | CRM System",
});
const dragCard = ref<ICard | null>(null);
const sourceCollumn = ref<IColumn | null>(null);
const { data, isLoading, refetch } = useKanbanQuery();
type typeMutationVariables = {
  docId: string;
  status?: EnumStatus;
};

const { mutate } = useMutation({
  mutationKey: ["move card"],
  mutationFn: async ({ docId, status }: typeMutationVariables) => {
    try {
      return await DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
        status,
      });
    } catch (error) {
      console.error("Ошибка при обновлении сделки:", error);
      throw error;
    }
  },
  onSuccess: () => {
    console.log("Mutation successful, refetching...");
    refetch();
  },
});
function handleDragStart(card: ICard, column: IColumn) {
  dragCard.value = card;
  sourceCollumn.value = column;
}
function handleDragOver(event: DragEvent) {
  event.preventDefault();
}
function handleDrop(targetColumn: IColumn) {
  if (dragCard.value && sourceCollumn.value) {
    mutate({ docId: dragCard.value.id, status: targetColumn.id });
  }
}
const dealStore = useDealSlideStore();
</script>

<template>
  <div class="p-10">
    <h1 class="text-white text-2xl text-center font-bold mb-10">CRM SYSTEM</h1>
    <!-- <div v-if="isLoading" class="text-white">Loading...</div> -->
    <Loader v-if="isLoading"></Loader>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div
          v-for="(column, index) in data"
          :key="column.id"
          @dragover="handleDragOver"
          @drop="() => handleDrop(column)"
          class="min-h-screen"
        >
          <div
            class="rounded bg-gray-700 py-1 px-5 mb-2 text-center"
            :style="generateColumnStyle(index, data?.length)"
          >
            {{ column.name }}
          </div>
          <div>
            <CreateDeal :refetch="refetch" :status="column.id"></CreateDeal>
            <Card
              v-for="item in column.items"
              :key="item.id"
              class="mb-5 dark"
              draggable="true"
              @dragstart="() => handleDragStart(item, column)"
              role="button"
              @click="dealStore.set(item)"
            >
              <CardHeader
                ><CardTitle class="mb-3"> {{ item.name }}</CardTitle>
                <CardDescription>{{
                  convertCurrency(item.price)
                }}</CardDescription>
              </CardHeader>

              <CardContent>{{ item.companyName }}</CardContent>
              <CardFooter>{{
                dayjs(item.$createdAt).format("DD MMMM YYYY")
              }}</CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <KanbanSlideover></KanbanSlideover>
    </div>
  </div>
</template>
