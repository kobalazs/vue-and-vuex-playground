import axios from 'axios';

let instance;

const createHttpInstance = (context) => {
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
        context.dispatch('auth/logout', null, { root: true });
      }

      return Promise.reject(error);
    },
  );

  return http;
};

export default (context) => {
  if (!instance) {
    instance = createHttpInstance(context);
  }

  // Token can change at any time, so we need to update it for every call!
  instance.defaults.headers.common.Authorization = `Bearer ${context.rootState.auth.token}`;

  return instance;
};
