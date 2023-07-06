<template>
  <div>
    <h2>Reset Password</h2>

    <form @submit.prevent="resetPassword">
      <div>
        <label>New Password:</label>
        <input type="password" v-model="password" required />
      </div>

      <button type="submit">Reset Password</button>
    </form>
    <div class="errors" v-if="errors.length">
      <ul>
        <li v-for="(error, index) in errors" :key="index">
          {{ error.msg }}
        </li>
      </ul>
    </div>
    <div v-if="message">
      {{ message }}
    </div>
  </div>
</template>
  
<script>
import unauthenticatedAxios from '../../config/unauthenticatedAxios';

export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      errors: [],
      message: ''
    };
  },
  methods: {
    resetPassword() {
      if (this.password !== this.confirmPassword) {
        this.errors = [{ msg: 'Les mots de passe ne correspondent pas.' }];
        return;
      }
      const resetToken = this.$route.params.token;

      this.errors = []; // Réinitialisation des erreurs
      this.message = ''; // Réinitialisation du message de succès

      unauthenticatedAxios.post('/api/auth/reset-password', {
        password: this.password,
        confirmPassword: this.confirmPassword,
        resetToken: resetToken // Ajout du token ici
      })
        .then(response => {
          // Gérer la réponse de la réinitialisation du mot de passe réussie
          console.log(response.data);
          this.message = "Mot de passe réinitialisé avec succès"; // Ajout du message de succès ici
        })
        .catch(error => {
          // Gérer les erreurs de la réinitialisation du mot de passe
          if (error.response && error.response.data) {
            if (error.response.data.errors) {
              this.errors = error.response.data.errors;
            } else if (error.response.data.message) {
              this.errors = [{ msg: error.response.data.message }]
            }
          } else {
            this.errors = [{ msg: 'Une erreur inattendue est survenue. Veuillez réessayer.' }]
          }
        });
    }

  }
};
</script>
  