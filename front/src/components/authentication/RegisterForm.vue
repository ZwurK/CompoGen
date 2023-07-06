<template>
  <div class="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <form @submit.prevent="register" class="mt-8 space-y-6">
        <div class="rounded-md shadow">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input v-model="username" id="username" name="username" type="text" required
              class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
              placeholder="Username" />
          </div>
          <div class="mt-2">
            <label for="email" class="sr-only">Email</label>
            <input v-model="email" id="email" name="email" type="email" required
              class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
              placeholder="Email" />
          </div>
          <div class="mt-2">
            <label for="password" class="sr-only">Password</label>
            <input v-model="password" id="password" name="password" type="password" required
              class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
              placeholder="Password" />
          </div>
          <div class="mt-2">
            <label for="confirmPassword" class="sr-only">Confirm Password</label>
            <input v-model="confirmPassword" id="confirmPassword" name="confirmPassword" type="password" required
              class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
              placeholder="Confirm Password" />
          </div>
        </div>
        <div>
          <button type="submit"
            class="w-full text-center mr-1 px-4 py-3 leading-none border rounded text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500">Register</button>
        </div>
      </form>
      <div class="text-red-500" v-if="errors.length">
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

import { useToast } from "vue-toastification";

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
    register() {
      if (this.password !== this.confirmPassword) {
        this.errors = [{ msg: 'Les mots de passe ne correspondent pas.' }];
        return;
      }

      this.$store.dispatch('user/register', {
        username: this.username,
        email: this.email,
        password: this.password
      })
        .then(() => {
          const toast = useToast();
          toast.success('Your account has been successfully created. Please log in.', {
            closeOnClick: true,
            pauseOnHover: true,
          });
          this.$emit('switchForm');
        })
        .catch(error => {
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
  },
};
</script>
