<script setup lang="ts">
import dayjs from "dayjs";
import { useComments } from "./useComments";
import { useCommentMutation } from "./useCreateComments";

const { data: comments, isLoading } = useComments();
const { commentRef, writeComment } = useCommentMutation();
</script>

<template>
  <div>
    <UIInput v-model="commentRef" @keyup.enter="writeComment" />

    <Skeleton v-if="isLoading" class="w-full h-[76px] rounded mt-5" />

    <div v-else>
      <div
        v-for="comment in comments"
        :key="comment.$id"
        class="flex items-start mt-5"
      >
        <Icon name="radix-icons:chat-bubble" class="mr-3 mt-1" size="25" />
        <div class="border-border bg-black/20 rounded p-3 w-full">
          <div class="mb-2 text-sm text-white">
            Комментарий {{ dayjs(comment.$createdAt).format("HH:mm") }}
          </div>
          <p>{{ comment.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
