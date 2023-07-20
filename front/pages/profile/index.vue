<template>
  <div class="flex flex-col items-center justify-center space-y-20 mt-40">

    <div>
      <h1 class="text-3xl font-semibold text-gray-900 mt-3">Profil</h1>
      <p class="text-lg font-semibold text-violet-600">Nom: {{ userStore.user.username }}</p>
      <p class="text-lg font-semibold text-violet-600">Email: {{ userStore.user.email }}</p>

      <h2 class="text-2xl font-semibold text-gray-900 mt-2">Mettre à jour le profil</h2>
      <form @submit.prevent="updateProfile" class="space-y-4">
        <label for="username" class="text-lg font-semibold text-violet-600">Nom d'utilisateur</label>
        <input id="username" v-model="newUsername" placeholder="Nouveau nom d'utilisateur"
          class="block appearance-none w-full text-lg py-3 px-4 pr-8 leading-none border-2 border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent bg-white" />

        <label for="password" class="text-lg font-semibold text-violet-600">Nouveau mot de passe</label>
        <input id="password" type="password" v-model="newPassword" placeholder="Nouveau mot de passe"
          class="block appearance-none w-full text-lg py-3 px-4 pr-8 leading-none border-2 border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent bg-white" />

        <button type="submit"
          class="flex items-center space-x-2 rounded bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2 text-white">
          <div class="flex items-center">
            <span>Mettre à jour</span>
          </div>
        </button>
      </form>
    </div>
    <button @click="logout"
      class="rounded bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 px-4 py-2 text-white mt-96">
      Déconnexion
    </button>
  </div>
</template>

<script setup>

definePageMeta({
  middleware: ['fetch-user-data']
})

import { useUserStore } from '~/stores/user';
const userStore = useUserStore();

const newUsername = ref('');
const newPassword = ref('');

const updateProfile = async () => {
  const payload = {};
  if (newUsername.value) {
    payload.username = newUsername.value;
  }
  if (newPassword.value) {
    payload.newPassword = newPassword.value;
  }
  userStore.updateProfile(payload);
};

const logout = async () => {
  userStore.logout();
  navigateTo('/');
};
</script>
