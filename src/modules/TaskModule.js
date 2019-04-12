// import axios from 'axios';

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
    //
  },
};
