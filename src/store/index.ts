import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      name: 'Bob Razowski',
      apiToken: '273b9080',
    },
  },
  getters: {
    getUserName: (state) => state.user.name,
    getApiToken: (state) => state.user.apiToken,
  },
});
