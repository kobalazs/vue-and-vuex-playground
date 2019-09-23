import Vue from 'vue';
import Router from 'vue-router';

import store from './store';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('./views/Registration.vue'),
    },
    {
      path: '/task-list',
      name: 'task-list',
      component: () => import('./views/TaskList.vue'),
      beforeEnter: (_to, _from, next) => {
        next(store.state.auth.user ? true : '/login');
      },
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import('./views/NotFound.vue'),
    },
  ],
});
