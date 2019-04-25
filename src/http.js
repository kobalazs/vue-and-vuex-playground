import axios from 'axios';

import router from './router';
import store from './store';

let instance;

const createHttpInstance = () => {
  const http = axios.create({
    baseURL: process.env.VUE_APP_API_ENDPOINT,
    timeout: 1000,
  });

  http.interceptors.response.use(
    response => response,
    (error) => {
      // eslint-disable-next-line no-console
      console.error(error);

      if (error.response.status === 401) {
        store.dispatch('auth/logout').then(() => {
          router.push('/');
        });
      }
      return Promise.reject(error);
    },
  );

  return http;
};

export default () => {
  if (!instance) {
    instance = createHttpInstance();
  }

  // Token can change at any time, so we need to update it for every call!
  instance.defaults.headers.common.Authorization = `Bearer ${store.state.auth.token}`;

  return instance;
};
