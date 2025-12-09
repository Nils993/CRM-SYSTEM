<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <p
    :class="
      cn(
        'text-xl  leading-none tracking-tighter px-3 pb-2 opacity-80',
        props.class
      )
    "
  >
    <slot />
  </p>
</template>
