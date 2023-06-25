<template>
    <div>
      <h1>Profil</h1>
      <div v-if="user">
        <p>Nom: {{ user.username }}</p>
        <p>Email: {{ user.email }}</p>
  
        <!-- Ajout du formulaire de mise à jour du profil -->
        <h2>Mettre à jour le profil</h2>
        <form @submit.prevent="updateProfile">
          <label for="username">Nom d'utilisateur</label>
          <input id="username" v-model="newUsername" placeholder="Nouveau nom d'utilisateur" />
  
          <label for="password">Nouveau mot de passe</label>
          <input id="password" type="password" v-model="newPassword" placeholder="Nouveau mot de passe" />
  
          <button type="submit">Mettre à jour</button>
        </form>
        <div v-if="errors.length > 0" class="errors">
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error.msg }}</li>
          </ul>
        </div>
        <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      </div>
      <button @click="logout">Déconnexion</button>
    </div>
  </template>

<script>
import authenticatedAxios from '../../config/axios';

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
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  }
};
</script>
