<template>
  <div class="flex flex-col items-center justify-center space-y-20 mt-40">

    <div v-if="user">
      <h1 class="text-3xl font-semibold text-gray-900 mt-3">Profil</h1>
      <p class="text-lg font-semibold text-violet-600">Nom: {{ user.username }}</p>
      <p class="text-lg font-semibold text-violet-600">Email: {{ user.email }}</p>

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
      <div v-if="errors.length > 0" class="errors text-red-500">
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error.msg }}</li>
        </ul>
      </div>
      <div v-if="successMessage" class="success-message text-green-500">{{ successMessage }}</div>
    </div>
    <button @click="logout"
      class="rounded bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 px-4 py-2 text-white mt-96">
      Déconnexion
    </button>
  </div>
</template>


<script>
import authenticatedAxios from '../../config/authenticatedAxios';
import { useToast } from "vue-toastification";

export default {
  name: 'ProfilePage',
  data() {
    return {
      user: null,
      newUsername: '',
      newPassword: '',
      errors: [],
      successMessage: '',
    };
  },
  created() {
    this.fetchUserProfile();
  },
  methods: {
    fetchUserProfile() {
      authenticatedAxios.get('/api/profile')
        .then(response => {
          this.user = response.data;
          this.newUsername = this.user.username;
        })
        .catch(error => {
          console.error(error);
        });
    },
    updateProfile() {
      const payload = {};
      if (this.newUsername) {
        payload.username = this.newUsername;
      }
      if (this.newPassword) {
        payload.newPassword = this.newPassword;
      }

      authenticatedAxios.put('/api/profile', payload)
        .then(response => {
          this.fetchUserProfile();
          this.newUsername = '';
          this.newPassword = '';
          this.errors = [];
          this.successMessage = response.data.message;
        })
        .catch(error => {
          if (error.response && error.response.status === 400) {
            this.errors = error.response.data.errors;
          } else {
            console.error(error);
          }
        });
    },

    logout() {
      this.$store.dispatch('user/logout')
        .then(() => {
          const toast = useToast();
          toast.success('You have successfully logged off.', {
            closeOnClick: true,
            pauseOnHover: true,
          });
          this.$router.push('/');
        });
    }
  }
};
</script>
