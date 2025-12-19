import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import type { ICard } from "~/components/kanban/kanban.types";

export const useDealSlideStore = defineStore("deal-slide", () => {
  const state = reactive({
    card: null as ICard | null,
    isOpen: false,
  });

  // Очистка состояния
  const clear = () => {
    state.card = null;
    state.isOpen = false;
  };

  // Установка нового значения для card
  const set = (card: ICard) => {
    state.card = card;
    state.isOpen = true;
  };

  // Переключение состояния isOpen
  const toggle = () => {
    state.isOpen = !state.isOpen;
  };

  return {
    ...toRefs(state),
    clear,
    set,
    toggle,
  };
});
