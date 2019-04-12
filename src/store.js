import Vue from 'vue';
import Vuex from 'vuex';

import AuthModule from './modules/AuthModule';
import TaskModule from './modules/TaskModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: AuthModule,
    task: TaskModule,
  },
});
