<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { v4 as uuid4 } from "uuid";
import { COLLECTION_DEALS, DB_ID } from "@/utils/app.constants";
import type { IDeal } from "~/typse/deals.types";
import Input from "../ui/input/Input.vue";
import { useForm } from "vee-validate";
const isOpenForm = ref(false);

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
const { handleSubmit, defineField, handleReset } = useForm<IDealFormState>({
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
      throw error; // чтобы useMutation знал о неудаче
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
  alert(JSON.stringify(values));
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
  <form v-if="isOpenForm" @submit="onSubmit" class="form">
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
  </form>
</template>

<style scoped>
/* .input {
  @apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border-border transition-colors;
}


.btn {
  @apply text-xs border py-1 px-2 rounded border-[#161c26] hover:border-[#482c65] transition-colors text-[#aebed5] hover:text-white;
}


.form {
  @apply mb-3 block;
  animation: show 0.3s ease-in-out;
}


@keyframes show {
  from {
    border-color: #a252c83d; 
    transform: translateY(-35px);
    opacity: 0.4;
  }

  90% {
    border-color: #a252c83d;
  }

  to {
    border-color: transparent;
    transform: translateY(0);
    opacity: 1;
  }
} */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
