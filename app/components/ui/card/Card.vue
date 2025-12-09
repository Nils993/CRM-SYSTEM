<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    :class="
      cn(
        ' rounded-lg bg-card text-card-foreground px-5 shadow animation border border-transparent transition-colors hover:border-[#a252c83d]',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>

<style scoped>
@keyframes show {
  0% {
    border-color: #a252c8;
    opacity: 0.4;
  }
  90% {
    border-color: #a252c8;
  }
  100% {
    border-color: transparent;
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
.animation {
  animation: show 0.3s ease-in-out;
}
</style>
