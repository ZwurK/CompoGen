<template>
    <div class="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <form @submit.prevent="login" class="mt-8 space-y-6">
                <div class="rounded-md shadow">
                    <div>
                        <label for="email" class="sr-only">Email</label>
                        <input v-model="email" id="email" name="email" type="email" required
                        class="w-full py-2 px-3 leading-none border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent bg-white"
                            placeholder="Email" />
                    </div>
                    <div class="mt-2">
                        <label for="password" class="sr-only">Password</label>
                        <input v-model="password" id="password" name="password" type="password" required
                            class="w-full py-2 px-3 leading-none border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent bg-white"
                            placeholder="Password" />
                    </div>
                </div>
                <div>
                    <button type="submit"
                        class="w-full text-center mr-1 px-4 py-3 leading-none border rounded text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500">Login</button>
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
    name: 'LoginForm',
    data() {
        return {
            email: '',
            password: '',
            errors: []
        };
    },
    methods: {
        // Appelle l'action login (les redirections et gestion d'erreurs restent souvent dans le composant)
        login() {
            this.$store.dispatch('user/login', {
                email: this.email,
                password: this.password
            })
                .then(() => {
                    const toast = useToast();
                    toast.success('You are now successfully connected!', {
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                    this.$router.push('/profile');
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
    