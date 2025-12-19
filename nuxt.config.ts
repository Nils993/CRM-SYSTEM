// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  modules: [
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxt/icon",
    "shadcn-nuxt",
    "@pinia/nuxt",

    [
      "@vee-validate/nuxt",
      {
        autoImports: true,
      },
    ],
  ],
  shadcn: {
    prefix: "UI",
    componentDir: "@/components/ui",
  },
  icon: {
    mode: "svg",
    aliases: {
      logout: "line-md:logout",
      Home: "radix-icons:dashboard",
      Products: "ep:goods",
      Payments: "ph:contactless-payment",
      Orders: "fluent:receipt-28-regular",
      Customers: "mingcute:group-line",
      Feedback: "radix-icons:gear",
      Help: "radix-icons:question-mark",
    },
  },
});
