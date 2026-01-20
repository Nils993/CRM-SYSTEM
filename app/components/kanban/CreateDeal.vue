<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { v4 as uuid4 } from "uuid";
import { COLLECTION_DEALS, DB_ID } from "@/utils/app.constants";
import type { IDeal } from "~/typse/deals.types";
import Input from "../ui/input/Input.vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
const isOpenForm = ref(false);
const validationSchema = yup.object({
  name: yup.string().required("Введите наименование"),
  price: yup
    .number()
    .typeError("Введите число")
    .positive("Цена должна быть больше 0")
    .required("Введите сумму"),
  customers: yup.object({
    email: yup.string().email("Неверный email").required("Введите email"),
    name: yup.string().required("Введите компанию"),
  }),
});
interface IDealFormState extends Pick<IDeal, "name" | "price"> {
  customers: {
    email: string;
    name: string;
  };
  status: string;
}
const props = defineProps({
  status: {
    type: String,
    default: "",
  },
  refetch: {
    type: Function,
  },
});
const { handleSubmit, defineField, handleReset, errors } =
  useForm<IDealFormState>({
    validationSchema,
    initialValues: {
      status: props.status,
    },
  });
const [name, nameAttrs] = defineField("name");
const [price, priceAttrs] = defineField("price");
const [customerEmail, customerEmailAttrs] = defineField("customers.email");
const [customerName, customerNameAttrs] = defineField("customers.name");

const { mutate, isPending } = useMutation({
  mutationKey: ["create a new deal"],
  mutationFn: async (data: IDealFormState) => {
    try {
      return await DB.createDocument(DB_ID, COLLECTION_DEALS, uuid4(), data);
    } catch (error) {
      console.error("Ошибка при создании сделки:", error);
      throw error;
    }
  },
  onSuccess() {
    props.refetch && props.refetch();
    handleReset();
  },
  onError(error) {
    alert("Ошибка при создании сделки: " + error?.message || error);
  },
});

const onSubmit = handleSubmit((values) => {
  mutate(values);
});
</script>
<template>
  <div class="text-center mb-2">
    <button
      class="transition-all opacity-5 hover:opacity-100 hover:text-[#a252c8]"
      @click="isOpenForm = !isOpenForm"
    >
      <Icon
        v-if="isOpenForm"
        name="radix-icons:arrow-up"
        class="fade-in-100 fade-out-0"
        size="35"
      />
      <Icon
        v-else
        name="radix-icons:plus-circled"
        class="fade-in-100 fade-out-0"
        size="35"
      />
    </button>
  </div>
  <form v-if="isOpenForm" @submit="onSubmit" class="form mb-3">
    <Input
      placeholder="Наименование"
      v-model="name"
      v-bind="nameAttrs"
      type="text"
      class="input"
    />

    <Input
      placeholder="Сумма"
      v-model="price"
      v-bind="priceAttrs"
      class="input no-spinner"
      type="number"
    />
    <Input
      placeholder="Email"
      v-model="customerEmail"
      v-bind="customerEmailAttrs"
      type="email"
      class="input"
    />
    <Input
      placeholder="Компания"
      v-model="customerName"
      v-bind="customerNameAttrs"
      type="text"
      class="input"
    />
    <button class="btn" :disabled="isPending">
      {{ isPending ? "Загрузка..." : "Добавить" }}
    </button>
    <ul v-if="Object.keys(errors).length" class="mt-3 text-red-500 text-sm">
      <li v-for="(error, field) in errors" :key="field">
        {{ error }}
      </li>
    </ul>
  </form>
</template>

<style scoped>
.btn {
  background-color: rgba(150, 61, 194, 0.3);
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn:hover {
  background-color: rgba(150, 61, 194, 0.5);
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
