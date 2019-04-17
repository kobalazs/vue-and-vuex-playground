import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';
import router from './router';
import store from './store';
import DateFilter from './filters/DateFilter';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VeeValidate);

Vue.filter('date', DateFilter);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
