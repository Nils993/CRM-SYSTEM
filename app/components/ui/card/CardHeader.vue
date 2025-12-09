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
        'flex text-xl  font-semibold flex-col space-y-1.5 p-3 pb-3 ',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
