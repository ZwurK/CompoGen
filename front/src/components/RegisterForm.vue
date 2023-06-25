<template>
  <div class="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <form @submit.prevent="register" class="mt-8 space-y-6">
        <div class="rounded-md shadow">
          <div>
            <label for="email" class="sr-only">Email</label>
            <input v-model="email" id="email" name="email" type="email" required
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-pink-900 placeholder-pink-400 focus:border-purple-500 focus:ring-purple-500"
              placeholder="Email" />
          </div>
          <div class="mt-2">
            <label for="password" class="sr-only">Password</label>
            <input v-model="password" id="password" name="password" type="password" required
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-pink-900 placeholder-pink-400 focus:border-purple-500 focus:ring-purple-500"
              placeholder="Password" />
          </div>
          <div class="mt-2">
            <label for="ConfirmPassword" class="sr-only">Confirm Password</label>
            <input v-model="confirmPassword" id="ConfirmPassword" name="ConfirmPassword" type="password" required
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-pink-900 placeholder-pink-400 focus:border-purple-500 focus:ring-purple-500"
              placeholder="Confirm Password" />
          </div>
        </div>
        <div>
          <button type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-lg font-medium text-white hover:from-pink-400 hover:to-purple-400">Register</button>
        </div>
      </form>
      <div class="errors" v-if="errors.length">
        <ul>
          <li v-for="(error, index) in errors" :key="index">
            {{ error.msg }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../config/axios';

export default {
  name: 'RegisterForm',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: []
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.errors = [{ msg: 'Les mots de passe ne correspondent pas.' }];
        return;
      }
      try {
        const response = await axios.post('/api/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password
        })
        console.log(response.data);
        this.$router.push('/login');
      } catch (error) {
        if (error.response && error.response.data) {
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
          } else if (error.response.data.message) {
            this.errors = [{ msg: error.response.data.message }]
          }
        } else {
          this.errors = [{ msg: 'Une erreur inattendue est survenue. Veuillez réessayer.' }]
        }
      }
    }
  }
};
</script>
