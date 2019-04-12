import axios from 'axios';

export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    login(context, user) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_API_ENDPOINT}/auth`, user).then((response) => {
          context.commit('setUser', response.data.user);
          context.commit('setToken', response.data.token);
          resolve();
        }).catch((error) => {
          reject(error.response.data.error || 'Server Error');
        });
      });
    },
    logout(context) {
      return new Promise((resolve) => {
        context.commit('setUser', null);
        context.commit('setToken', null);
        resolve();
      });
    },
  },
};
