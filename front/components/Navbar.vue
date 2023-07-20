<template>
  <nav class="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-4 sm:px-5 lg:px-10 ">
      <router-link to="/" class="flex items-center">
        <img src="/images/logo.png" class="h-9 mr-3" alt="Flowbite Logo">
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-gray-900 hidden sm:block">CompoGen</span>
      </router-link>
      <div class="flex md:order-2">
        <div v-if="isLoggedIn" class="relative">
          <button @click="toggleDropdown"
            class="text-center px-4 py-3 leading-none border-2 border-violet-600 rounded text-violet-600 md:ml-10 hover:text-white hover:bg-violet-600">
            My Account
          </button>
          <div v-show="showDropdown" class="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl">
            <router-link class="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-600 hover:text-white"
              to="/profile/favorites">
              Favorites</router-link>
            <router-link class="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-600 hover:text-white" to="/profile">
              Settings</router-link>
            <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-600 hover:text-white"
              @click="logout">Logout</a>
          </div>
        </div>
        <a v-else @click="toggleModal"
          class="text-center mr-1 px-4 py-3 leading-none border rounded text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500">
          Get Started
        </a>
        <button @click="isOpen = !isOpen" type="button"
          class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-sticky" :aria-expanded="isOpen">
          <span class="sr-only">Open main menu</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
      <div :class="{ 'hidden': !isOpen, 'block': isOpen }"
        class="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
          <li>
            <router-link to="/"
              :class="{ 'text-white bg-violet-600 border-b-2 border-violet-600 md:text-violet-600': currentPage === 'index' }"
              class="block py-2 pl-3 pr-4 rounded md:text-gray-900 md:hover:text-violet-600 md:rounded-none md:bg-transparent md:p-0">Home</router-link>
          </li>
          <li>
            <router-link to="/generate"
              :class="{ 'text-white bg-violet-600 border-b-2 border-violet-600 md:text-violet-600': currentPage === 'generate' }"
              class="block py-2 pl-3 pr-4 rounded md:text-gray-900 md:hover:text-violet-600 md:rounded-none md:bg-transparent md:p-0">Generate</router-link>
          </li>
          <li>
            <router-link to="/explore"
              :class="{ 'text-white bg-violet-600 border-b-2 border-violet-600 md:text-violet-600': currentPage === 'explore' }"
              class="block py-2 pl-3 pr-4 rounded md:text-gray-900 md:hover:text-violet-600 md:rounded-none md:bg-transparent md:p-0">Explore</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div v-if="showModal && !isLoggedIn" class="fixed inset-0 flex items-center justify-center z-50"
    @click="showModal = false">
    <div class="fixed inset-0 transition-opacity" aria-hidden="true">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    <div @click.stop
      class="w-full max-w-md m-5 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 max-h-100">
      <div class="bg-white p-5 rounded-lg shadow-lg overflow-auto">
        <div>
          <h2 class="mt-6 text-center text-3xl font-bold text-violet-600">{{ formType === 'register' ? 'Register' :
            'Login'
          }}</h2>
        </div>
        <LoginForm v-if="formType === 'login'" @switchForm="switchForm"></LoginForm>
        <RegisterForm v-else @switchForm="switchForm"></RegisterForm>
        <p>{{ formType === 'register' ? 'Already have an account?' : 'No account yet?' }} <a @click="switchForm"
            class="text-lg text-violet-600 hover:text-purple-500 font-semibold">{{ formType === 'register' ? 'Login' :
              'Register' }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { watchEffect, ref, computed } from 'vue';
import { useUserStore } from '~/stores/user';

const showModal = ref(false);
const formType = ref('login');
const showDropdown = ref(false);
const isOpen = ref(false);

const currentPage = ref('');
const route = useRoute()
const userStore = useUserStore();

const isLoggedIn = computed(() => userStore.isLoggedIn);

watchEffect(() => {
  currentPage.value = route.name;
  console.log(currentPage.value)
});

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const closeModal = () => {
  showModal.value = false;
};

const switchForm = () => {
  formType.value = formType.value === 'register' ? 'login' : 'register';
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const logout = () => {
  userStore.logout()
};
</script>
