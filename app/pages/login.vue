<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import Input from "~/components/ui/input/Input.vue";
// import { v4 as uuidv4 } from "uuid";
useHead({
  title: "Login",
});
const emailRef = ref("");
const passwordRef = ref("");
const nameRef = ref("");
const isLoadingStore = useIsLoadingStore();
const store = useAuthStore();
const router = useRouter();
const login = async () => {
  isLoadingStore.set(true);
  await account.createEmailPasswordSession(emailRef.value, passwordRef.value);
  const response = await account.get();
  if (response) {
    store.set({
      email: response.email,
      name: response.name,
      status: response.status,
    });
  }
  emailRef.value = "";
  passwordRef.value = "";
  nameRef.value = "";
  await router.push("/");
  isLoadingStore.set(false);
};

const registere = async () => {
  await account.create(
    ID.unique(),
    emailRef.value,
    passwordRef.value,
    nameRef.value
  );
  await login();
};
</script>
<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-gray-800 w-1/4 p-5">
      <h1 class="text-2xl font-bold text-center mb-5 text-white">Login</h1>
      <form>
        <Input
          placeholder="Email"
          type="email"
          class="mb-3 text-white"
          v-model="emailRef"
        ></Input>
        <Input
          placeholder="Password"
          type="password"
          class="mb-3 text-white"
          v-model="passwordRef"
        ></Input>
        <Input
          placeholder="Name"
          type="name"
          class="mb-3 text-white"
          v-model="nameRef"
        ></Input>
        <div class="flex items-center justify-center gap-5">
          <Button type="button" @click="login">Login</Button>
          <Button type="button" @click="registere">Register</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
