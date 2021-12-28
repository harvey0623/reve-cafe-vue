import '@/assets/scss/modules/index.scss';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionAPI from '@vue/composition-api'
import VueMeta from 'vue-meta'
import '@/plugins/storage/index.js'
import '@/component/Global/index.js';

// import Swiper from 'swiper/swiper-bundle.min.js';
// import 'swiper/swiper.min.css';

// import VueProgressBar from 'vue-progressbar'
// Vue.use(VueProgressBar, {
//   color: 'orange',
//   failedColor: 'red',
//   height: '2px'
// })

Vue.use(VueCompositionAPI)
Vue.use(VueMeta)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
