import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { COLLECTION_COMMENTS, DB_ID } from "@/utils/app.constants";

export function useCommentMutation() {
  const store = useDealSlideStore();
  const commentRef = ref("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () =>
      DB.createDocument(DB_ID, COLLECTION_COMMENTS, ID.unique(), {
        text: commentRef.value,
        deal: store.card!.id,
      }),

    onSuccess: (newComment) => {
      commentRef.value = "";

      // 🔥 МГНОВЕННО обновляем комментарии
      queryClient.setQueryData(
        ["comments", store.card!.id],
        (old: any[] | undefined) => {
          if (!old) return [newComment];
          return [...old, newComment];
        }
      );
    },
  });

  return {
    commentRef,
    writeComment: () => {
      if (!commentRef.value) return;
      mutate();
    },
  };
}
