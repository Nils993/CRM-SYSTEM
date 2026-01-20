<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import Input from "~/components/ui/input/Input.vue";
import { AppwriteException, ID } from "appwrite";
import { useForm } from "vee-validate";
import * as yup from "yup";
useHead({ title: "Login" });
const isRegister = ref(false);
const isLoadingStore = useIsLoadingStore();
const store = useAuthStore();
const router = useRouter();
const validationSchema = computed(() =>
  yup.object({
    email: yup.string().email("Неверный email").required("Введите email"),

    password: yup
      .string()
      .min(6, "Минимум 8 символов")
      .required("Введите пароль"),

    name: isRegister.value
      ? yup.string().required("Введите имя")
      : yup.string().optional(),
  }),
);
const { handleSubmit, defineField, errors, handleReset, setErrors } = useForm({
  validationSchema,
});
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [name, nameAttrs] = defineField("name");

const loginInternal = async () => {
  await account.createEmailPasswordSession(email.value, password.value);
  const response = await account.get();

  store.set({
    email: response.email,
    name: response.name,
    status: response.status,
  });

  handleReset();
};

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoadingStore.set(true);

    if (isRegister.value) {
      await account.create(
        ID.unique(),
        values.email,
        values.password,
        values.name,
      );
    }

    await loginInternal();
    await router.push("/");
  } catch (error) {
    setErrors({
      form: (error as AppwriteException).message,
    });
  } finally {
    isLoadingStore.set(false);
  }
});
</script>
<template>
  <div class="flex flex-col items-center justify-center min-h-screen w-full">
    <div class="rounded bg-gray-800 w-80 p-5 mb-6">
      <h1 class="text-2xl font-bold text-center mb-5 text-white">
        {{ isRegister ? "Регистрация" : "Вход" }}
      </h1>

      <form @submit="onSubmit">
        <Input
          placeholder="Email"
          type="email"
          class="mb-2 text-white"
          v-model="email"
          v-bind="emailAttrs"
        />

        <Input
          placeholder="Пароль"
          type="password"
          class="mb-2 text-white"
          v-model="password"
          v-bind="passwordAttrs"
        />

        <Input
          v-if="isRegister"
          placeholder="Имя"
          type="text"
          class="mb-2 text-white"
          v-model="name"
          v-bind="nameAttrs"
        />

        <ul v-if="Object.keys(errors).length" class="text-red-500 text-sm mb-3">
          <li v-for="(error, field) in errors" :key="field">
            {{ error }}
          </li>
        </ul>

        <div class="flex justify-center gap-4">
          <Button type="submit">
            {{ isRegister ? "Зарегистрироваться" : "Войти" }}
          </Button>

          <Button
            type="button"
            variant="outline"
            @click="isRegister = !isRegister"
          >
            {{ isRegister ? "Вход" : "Регистрация" }}
          </Button>
        </div>
      </form>
    </div>

    <Loader
      v-if="isLoadingStore.isLoading"
      class="fixed z-50 items-center justify-center"
    />
  </div>
</template>

<style scoped></style>
