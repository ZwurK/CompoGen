import axios from 'axios';

const state = {
  components: [],
  totalPages: 0,
};

const getters = {
  components: (state) => state.components,
  totalPages: (state) => state.totalPages,
};

const actions = {
  async fetchComponents({ commit }, page) {
    const response = await axios.get(`http://localhost:3000/api/elements/explore?page=${page}`);
    commit('setComponents', response.data.components);
    commit('setTotalPages', response.data.totalPages);
  },
  updateComponentLikes({ commit }, payload) {
    commit('updateComponentLikes', payload);
  },
};

const mutations = {
  setComponents: (state, components) => (state.components = components),
  setTotalPages: (state, totalPages) => (state.totalPages = totalPages),
  updateComponentLikes: (state, { componentId, newLikes }) => {
    const component = state.components.find((component) => component._id === componentId);
    if (component) {
      component.likes = newLikes;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
