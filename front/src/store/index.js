import { createStore } from 'vuex';
import explore from './modules/explore';
import favorite from './modules/favorite';
import user from './modules/user';

const store = createStore({
  modules: {
    explore,
    favorite,
    user,
  },
});

export default store;

