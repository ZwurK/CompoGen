import authenticatedAxios from '../../config/axios';

const state = {
  likedComponents: [],
};

const getters = {
  likedComponents: (state) => state.likedComponents,
};

const actions = {
  async updateLikedComponents({ commit, state }, componentId) {
    try {

      const hasLiked = state.likedComponents.includes(componentId);
      
      let response;
      if (hasLiked) {

        response = await authenticatedAxios.put(`http://localhost:3000/api/favorite/unlike/${componentId}`);
      } else {

        response = await authenticatedAxios.put(`http://localhost:3000/api/favorite/like/${componentId}`);
      }

      if (response.status === 200) {
        commit('updateLikedComponents', componentId);
        return response.data.likes;
      }
    } catch (error) {
      console.error(error);
    }
  },
};


const mutations = {
  updateLikedComponents: (state, componentId) => {
    const index = state.likedComponents.indexOf(componentId);
    if (index > -1) {
      state.likedComponents.splice(index, 1);
    } else {
      state.likedComponents.push(componentId);
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
