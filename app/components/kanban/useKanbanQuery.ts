import { useQuery } from "@tanstack/vue-query";
import { KANBAN_DATA } from "./kanban.data";
import {
  COLLECTION_DEALS,
  DB_ID,
  COLLECTION_CUSTOMERS,
} from "@/utils/app.constants";
import type { ICard, IColumn } from "./kanban.types";
export function useKanbanQuery() {
  return useQuery({
    queryKey: ["deals"],
    async queryFn() {
      const dealsResponse = await DB.listDocuments(DB_ID, COLLECTION_DEALS);
      const deals = dealsResponse.documents;
      const customerIds = [...new Set(deals.map((deal) => deal.customers))];
      const customersArray = await Promise.all(
        customerIds.map((id) => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, id))
      );
      const customersMap = {};
      for (const customer of customersArray) {
        customersMap[customer.$id] = customer;
      }
      return { deals, customersMap };
    },
    select(data) {
      const { deals, customersMap } = data;
      const newBoard = KANBAN_DATA.map((column) => ({
        ...column,
        items: <ICard[]>[],
      }));

      for (const deal of deals) {
        const column = newBoard.find((col) => col.id === deal.status);
        const customer = customersMap[deal.customers];

        if (column && customer) {
          column.items.push({
            $createdAt: deal.$createdAt,
            id: deal.$id,
            name: deal.name,
            price: deal.price,
            companyName: customer.name,
            status: column.name,
          });
        }
      }
      return newBoard;
    },
  });
}
