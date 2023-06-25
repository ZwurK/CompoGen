<template>
  <div>
    <h2>Forgot Password</h2>

    <form @submit.prevent="forgotPassword">
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>

      <button type="submit">Send Reset Link</button>
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
import axios from '../../config/axios';

export default {
  data() {
    return {
      email: '',
      errors: [],
      message: ''
    };
  },
  methods: {
    forgotPassword() {

      this.errors = []; // Réinitialisation des erreurs
      this.message = ''; // Réinitialisation du message de succès

      axios.post('/api/auth/forgot-password', {
        email: this.email
      })
        .then(response => {
          // Gérer la réponse de la demande de réinitialisation de mot de passe réussie
          console.log(response.data);
          this.message = "Un e-mail de réinitialisation de mot de passe a été envoyé"; // Ajout du message de succès ici
        })
        .catch(error => {
          // Gérer les erreurs de la demande de réinitialisation de mot de passe
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
  