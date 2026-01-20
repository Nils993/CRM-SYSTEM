<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { COLLECTION_CUSTOMERS, DB_ID } from "@/utils/app.constants";
import type { ICustomer } from "~/typse/deals.types";
import Table from "~/components/ui/table/Table.vue";
import TableHeader from "~/components/ui/table/TableHeader.vue";
import TableRow from "~/components/ui/table/TableRow.vue";
import TableHead from "~/components/ui/table/TableHead.vue";
import TableBody from "~/components/ui/table/TableBody.vue";
import TableCell from "~/components/ui/table/TableCell.vue";
useSeoMeta({
  title: "Customers | CRM System",
});
const { data, isLoading } = useQuery<ICustomer[]>({
  queryKey: ["customers"],
  queryFn: async () => {
    const customers = await DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS);

    return customers.documents as unknown as ICustomer[];
  },
});
console.log(data);
</script>
<template>
  <div>
    <h1 class="font-bold text-2xl md-10">Наши клиенты</h1>
    <div v-if="isLoading">Loading...</div>
    <Table v-else>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">Изображение</TableHead>
          <TableHead class="w-[200px]">Наименование</TableHead>
          <TableHead class="w-[200px]">Email</TableHead>
          <TableHead>Откуда пришёл</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="customer in data ?? []" :key="customer.$id">
          <TableCell>
            <NuxtLink :href="`/customers/edit/${customer.$id}`">
              <NuxtImg
                :src="customer.avatar_url"
                :alt="customer.name"
                width="50"
                height="50"
                class="rounded-full"
              />
            </NuxtLink>
          </TableCell>
          <TableCell>{{ customer.name }}</TableCell>
          <TableCell>{{ customer.email }}</TableCell>
          <TableCell>{{ customer.from_source }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<style scoped></style>
