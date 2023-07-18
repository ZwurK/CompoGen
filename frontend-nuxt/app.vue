<template>
  <div>
    <Navbar/>
    <main class="px-4 sm:px-5 lg:px-10 max-w-screen-xl mx-auto">
      <NuxtPage />
    </main>
    <ContactForm />
    <Footer/>
  </div>
</template>

<script setup>

import { useUserStore } from '~/stores/user';
const userStore = useUserStore();

onMounted(async () => {
  if (userStore.isLoggedIn) {
    await userStore.fetchUser();
  }
});

</script>
