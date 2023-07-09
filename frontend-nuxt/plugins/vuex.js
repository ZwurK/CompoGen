import { createStore } from 'vuex';
import favorite from './modules/favorite';
import user from './modules/user';

const store = createStore({
  modules: {
    favorite,
    user,
  },
});


export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
  // Install the store instance as a plugin
});


