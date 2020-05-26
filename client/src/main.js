import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios';
import axios from 'axios';
import VueFormulate from '@braid/vue-formulate';
import vuescroll from 'vuescroll';

Vue.config.productionTip = false

Vue.use(VueFormulate);
Vue.use(VueAxios, axios);
Vue.use(vuescroll);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
