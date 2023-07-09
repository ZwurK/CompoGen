// import authenticatedAxios from "../../config/authenticatedAxios";
// import unauthenticatedAxios from "../../config/unauthenticatedAxios";

const state = {
  userFavorites: [],
  components: [],
};

const getters = {
  userFavorites: (state) => state.userFavorites,
  components: (state) => state.components,
};

const actions = {
  async fetchUserFavorites({ commit }) {
    const response = await authenticatedAxios.get(
      "/api/favorite/getUserFavorites"
    );
    commit("setUserFavorites", response.data);
  },
  async fetchComponents({ commit }, params) {
    const response = await unauthenticatedAxios.get("/api/components/explore", {
      params: params,
    });
    commit("setComponents", response.data.docs);
  },
};

const mutations = {
  setUserFavorites(state, favorites) {
    state.userFavorites = favorites;
  },
  addFavorite(state, componentId) {
    state.userFavorites.push(componentId);
  },
  removeFavorite(state, componentId) {
    const index = state.userFavorites.indexOf(componentId);
    if (index !== -1) {
      state.userFavorites.splice(index, 1);
    }
  },
  setComponents(state, components) {
    state.components = components;
  },
  updateComponentLikes(state, { componentId, likes }) {
    const index = state.components.findIndex(
      (component) => component._id === componentId
    );
    if (index !== -1) {
      state.components[index].likes = likes;
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
