import '@/assets/scss/modules/index.scss';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionAPI from '@vue/composition-api'
import VueMeta from 'vue-meta'
import '@/component/Global/index.js'
import '@/component/PageProgress/index.js'
import '@/component/veevalidate/index.js';
import 'swiper/swiper-bundle.min.css';

Vue.use(VueCompositionAPI)
Vue.use(VueMeta)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
