<script setup lang="ts">
const user = defineProps<{ name: string }>();
import Menu from "./Menu.vue";
const isLoadingStore = useIsLoadingStore();
const store = useAuthStore();
const router = useRouter();
const logout = async () => {
  isLoadingStore.set(true);
  await account.deleteSession("current");
  store.clear();
  await router.push("/login");
  isLoadingStore.set(false);
};
</script>
<template>
  <aside
    class="px-5 py-10 h-full w-full relative bg-gray-800 text-white text-xl"
  >
    <NuxtLink to="/" class="mb-10 block">
      <NuxtImg src="/logo.svg" alt="" width="100px" class="mx-auto"></NuxtImg>
    </NuxtLink>
    <button
      @click="logout"
      class="absolute top-3 right-3 transition-colors hover:text-purple-600"
    >
      <Icon name="logout" size="25" />
    </button>
    <p class="mb-5">User: {{ store.user.name }}</p>
    <Menu />
  </aside>
</template>
