<template>
  <nav class="flex items-center justify-between flex-wrap p-6">
      <RouterLink to="/" class="flex items-center flex-no-shrink text-white mr-6">
        <img class="h-8 w-8 mr-2" src="../assets/logo.png" alt="Logo">
        <span class="text-black font-semibold text-xl tracking-tight">CompoGen</span>
      </RouterLink>
    <div class="block lg:hidden">
      <button @click="isOpen = !isOpen"
        class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div :class="{ 'block mt-4': isOpen, 'hidden': !isOpen }"
      class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:items-center">
        <router-link class="text-lg text-pink-400 hover:text-purple-500 font-bold md:ml-10" to="/generate">Generate
        </router-link>
        <router-link class="text-lg text-pink-400 hover:text-purple-500 font-bold md:ml-10" to="/explore">Explore
        </router-link>
        <div v-if="isUserLoggedIn" class="relative">
          <button @click="toggleDropdown" class="text-center text-lg px-5 py-3 leading-none border-2 border-pink-400 rounded text-pink-400 md:ml-10">
            Mon compte
          </button>
          <div v-show="showDropdown" class="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl">
            <router-link class="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-400 hover:text-white" to="/favorites">
              Favorites</router-link>
            <router-link class="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-400 hover:text-white" to="/profile">
              Settings</router-link>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-400 hover:text-white"
              @click="logout">Logout</a>
          </div>
        </div>
        <a v-else @click="toggleModal" href="#"
          class="text-center text-lg px-5 py-3 leading-none border rounded text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 md:ml-10">
          Create an account
        </a>
      </div>
    </div>
  </nav>




  <div v-if="showModal && !isUserLoggedIn" class="fixed inset-0 flex items-center justify-center z-50"
    @click.self="closeModal">
    <div
      class="w-full max-w-md m-5 border-2 border-gray-300 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 max-h-100">
      <div class="bg-white p-5 rounded-lg shadow-lg overflow-auto">
        <div>
          <h2 class="mt-6 text-center text-3xl font-bold text-pink-400">{{ formType === 'register' ? 'Register' : 'Login'
          }}</h2>
        </div>
        <LoginForm v-if="formType === 'login'" @switchForm="switchForm"></LoginForm>
        <RegisterForm v-else @switchForm="switchForm"></RegisterForm>
        <p>{{ formType === 'register' ? 'Already have an account?' : 'No account yet?' }} <a @click="switchForm" href="#"
            class="text-lg text-pink-400 hover:text-purple-500 font-semibold">{{ formType === 'register' ? 'Login' :
              'Register' }}</a>
        </p>
      </div>
    </div>
  </div>
</template>
  
<script>
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default {
  name: 'NavbarWhite',
  components: {
    RegisterForm,
    LoginForm,
  },
  data() {
    return {
      showModal: false,
      formType: 'login',
      showDropdown: false,
      isOpen: false,
    }
  },
  computed: {
    isUserLoggedIn() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    closeModal() {
      this.showModal = false;
    },
    switchForm() {
      this.formType = this.formType === 'register' ? 'login' : 'register';
    },
    logout() {
      localStorage.removeItem('token');
    }
  },
}
</script>
  