import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import type { ICard } from "~/components/kanban/kanban.types";

export const useDealSlideStore = defineStore("deal-slide", () => {
  const state = reactive({
    card: null as ICard | null,
    isOpen: false,
  });
  const clear = () => {
    state.card = null;
    state.isOpen = false;
  };

  const set = (card: ICard) => {
    state.card = card;
    state.isOpen = true;
  };
  return {
    ...toRefs(state),
    clear,
    set,
  };
});
