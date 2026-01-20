<script setup lang="ts">
import { storege } from "~/utils/appwrie";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from "@/utils/app.constants";
import type { ICustomer } from "~/typse/deals.types";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
interface InputFileEvent extends Event {
  target: HTMLInputElement;
}
interface IcustomerFormState
  extends Pick<ICustomer, "avatar_url" | "email" | "name" | "from_source"> {}
useSeoMeta({
  title: "Редактирование компании",
});
const route = useRoute();
const customerId = route.params.id as string;
const { handleSubmit, defineField, setFieldValue, setValues, values } =
  useForm<IcustomerFormState>();
const { data, isSuccess } = useQuery({
  queryKey: ["get customer", customerId],
  queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId),
});
watch(isSuccess, () => {
  const initialData = data.value as unknown as IcustomerFormState;
  setValues({
    email: initialData.email,
    avatar_url: initialData.avatar_url,
    from_source: initialData.from_source || "",
    name: initialData.name,
  });
});

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [fromSource, fromSourceAttrs] = defineField("from_source");
const { mutate, isPending } = useMutation({
  mutationKey: ["update customer", customerId],
  mutationFn: (data: IcustomerFormState) =>
    DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data),
});
const { mutate: uploadImage, isPending: isUpLoadImagePending } = useMutation({
  mutationKey: ["upload image"],
  mutationFn: (file: File) => storege.createFile(STORAGE_ID, ID.unique(), file),
  onSuccess(data) {
    const response = storege.getFileDownload(STORAGE_ID, data.$id);
    console.log(response);
    setFieldValue("avatar_url", response);
  },
});
const onSubmit = handleSubmit((values) => {
  console.log("SUBMIT VALUES:", values);
  mutate(values);
});
</script>
<template>
  <div>
    <h1 class="font-bold text-2xl md-10">
      Редактирование {{ (data as unknown as IcustomerFormState)?.name }}
    </h1>
    <form @submit.prevent="onSubmit" class="form">
      <Input
        placeholder="Наименование"
        v-model="name"
        v-bind="nameAttrs"
        class="input"
        type="text"
      />
      <Input
        placeholder="Email"
        v-model="email"
        v-bind="emailAttrs"
        class="input"
        type="email"
      />
      <Input
        placeholder="Откуда пришёл"
        v-model="fromSource"
        v-bind="fromSourceAttrs"
        class="input"
        type="text"
      />
      <img
        v-if="values.avatar_url || isUpLoadImagePending"
        :src="values.avatar_url"
        width="50"
        height="50"
        class="rounded-full my-2"
      />
      <div class="grid w-full max-w-sm items-center gap-1.5 input">
        <label>
          <div class="text-sm mb-2">Логотип</div>
          <Input
            type="file"
            :onchange="(e:InputFileEvent)=>e?.target?.files?.length &&uploadImage(e.target.files[0])"
            :disabled="isUpLoadImagePending"
          />
        </label>
      </div>
      <Button
        type="submit"
        :disabled="isPending"
        variant="secondary"
        class="mt-3"
      >
        {{ isPending ? "Загрузка" : "Сохранить" }}
      </Button>
    </form>
  </div>
</template>

<style scoped></style>
