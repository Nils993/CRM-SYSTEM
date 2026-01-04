import { useQuery } from "@tanstack/vue-query";
import { COLLECTION_COMMENTS, DB_ID } from "@/utils/app.constants";

export function useComments() {
  const store = useDealSlideStore();

  return useQuery({
    queryKey: ["comments", store.card?.id],

    enabled: computed(() => !!store.card?.id),

    queryFn: async () => {
      const response = await DB.listDocuments(DB_ID, COLLECTION_COMMENTS);

      return response.documents.filter(
        (comment) => comment.deal === store.card!.id
      );
    },
  });
}
