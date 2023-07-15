import { useCookie } from '#app'

const state = () => ({
  token: "",
  user: null,
});

const getters = {
  isLoggedIn: (state) => !!state.token,
};

const actions = {
  async login({ commit }, credentials) {
    const response = await unauthenticatedAxios.post(
      "/api/auth/login",
      credentials
    );
    const token = response.data.token;
    const cookie = useCookie('token');
    cookie.value = token;
    commit("setToken", token);
  },

  async register({ commit }, payload) {
    const response = await unauthenticatedAxios.post(
      "/api/auth/register",
      payload
    );
    commit("setUser", response.data);
  },

  async logout({ commit }) {
    const cookie = useCookie('token');
    cookie.value = null;
    commit("setToken", null);
  },
};

const mutations = {
  setToken: (state, token) => (state.token = token),
  setUser: (state, user) => (state.user = user),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
