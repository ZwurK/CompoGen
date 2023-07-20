import { useUserStore } from "~/stores/user";

export default async function (to, from) {
    
const userStore = useUserStore();

  if (userStore.isLoggedIn) {
    await userStore.fetchUser();
  }
}
