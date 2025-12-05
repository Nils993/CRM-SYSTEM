export interface ImenuItem {
  name: string;
  url: string;
}
export const useMenuStore = defineStore("menuStore", () => {
  const MENU_DATA: ImenuItem[] = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "Payments", url: "/payments" },
    { name: "Orders", url: "/orders" },
    { name: "Customers", url: "/customers" },
    { name: "Feedback", url: "/feedback" },
    { name: "Help", url: "/help" },
  ];
  return {
    MENU_DATA,
  };
});
