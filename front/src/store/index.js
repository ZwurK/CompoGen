import { createStore } from 'vuex';
import favorite from './modules/favorite';
import user from './modules/user';

const store = createStore({
  modules: {
    favorite,
    user,
  },
});

export default store;

