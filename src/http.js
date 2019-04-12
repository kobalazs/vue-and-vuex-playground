import axios from 'axios';

import router from './router';
import store from './store';

let instance;

export default () => {
  if (!instance) {
    instance = axios.create({
      baseURL: process.env.VUE_APP_API_ENDPOINT,
      timeout: 1000,
      headers: {
        Authorization: `Bearer ${store.state.auth.token}`,
      },
    });

    instance.interceptors.response.use(
      response => response,
      (error) => {
        if (['token_invalid', 'token_expired'].includes(error.response.data.error)) {
          store.dispatch('auth/logout').then(() => {
            router.push('/');
          });
        }
        return Promise.reject(error);
      },
    );
  }

  return instance;
};
