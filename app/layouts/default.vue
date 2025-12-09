<script setup lang="ts">
const isLoadingStore = useIsLoadingStore();
const store = useAuthStore();
const router = useRouter();
onMounted(async () => {
  try {
    const user = await account.get();
    if (user) store.set(user);
  } catch (error) {
    router.push("/login");
  } finally {
    isLoadingStore.set(false);
  }
});
</script>

<template>
  <Loader
    class="bg-gray-900 items-center justify-center"
    v-if="isLoadingStore.isLoading"
  ></Loader>
  <div v-else class="grid grid-cols-16 h-full bg-gray-900">
    <Sidebar v-if="store.isAuth" class="col-span-3 h-full" />
    <div class="col-span-13 ml-4">
      <slot></slot>
    </div>
  </div>
</template>
