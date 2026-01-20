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
  <div class="grid grid-cols-16 bg-gray-900">
    <Sidebar v-if="store.isAuth" class="col-span-3 h-full" />
    <div class="col-span-13 ml-4 h-screen">
      <slot></slot>
    </div>
  </div>
</template>
