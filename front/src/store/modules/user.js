import axios from 'axios';

const state = {
  token: localStorage.getItem('token') || '',
};

const getters = {
  isLoggedIn: (state) => !!state.token,
};

const actions = {
  async fetchUserFavorites({ commit, state }) {
    if (!state.token) {
      return;
    }
    const response = await axios({
      url: 'http://localhost:3000/api/favorite/getUserFavorites',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${state.token}`,
      },
    });
    commit('setLikedComponents', response.data.map(component => component._id));
  },
};

const mutations = {
  setLikedComponents: (state, likedComponents) => (state.likedComponents = likedComponents),
};

export default {
    namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
