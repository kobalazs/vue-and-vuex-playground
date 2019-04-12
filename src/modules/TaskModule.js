import http from '../http';

export default {
  namespaced: true,
  state: {
    tasks: [],
  },
  mutations: {
    setTasks(state, payload) {
      state.tasks = payload;
    },
  },
  actions: {
    list(context) {
      return new Promise((resolve, reject) => {
        http().get('/task').then((response) => {
          context.commit('setTasks', response.data);
          resolve();
        }).catch((error) => {
          reject(error.response.data.error || 'Server Error');
        });
      });
    },
  },
};
