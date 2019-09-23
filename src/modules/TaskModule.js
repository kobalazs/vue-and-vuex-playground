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
        http(context).get('/task').then((response) => {
          context.commit('setTasks', response.data);
          resolve();
        }).catch((error) => {
          reject(error.response.data.message || 'Server Error');
        });
      });
    },

    create(context, task) {
      return new Promise(async (resolve, reject) => {
        try {
          await http(context).post('/task', task);
          await context.dispatch('list');
          resolve();
        } catch (error) {
          reject(error.response.data.message || 'Server Error');
        }
      });
    },

    modify(context, task) {
      return new Promise(async (resolve, reject) => {
        try {
          await http(context).put(`/task/${task.id}`, task);
          await context.dispatch('list');
          resolve();
        } catch (error) {
          reject(error.response.data.message || 'Server Error');
        }
      });
    },

    delete(context, task) {
      return new Promise(async (resolve, reject) => {
        try {
          await http(context).delete(`/task/${task.id}`);
          await context.dispatch('list');
          resolve();
        } catch (error) {
          reject(error.response.data.message || 'Server Error');
        }
      });
    },
  },
};
