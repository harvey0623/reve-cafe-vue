import Vue from 'vue'
import Loading from '@/component/Loading/index.vue'
import ModalMessage from '@/component/Modal/message.vue'
import HomeLayout from '@/component/Layout/Home.vue'
import PageLayout from '@/component/Layout/Page.vue'

Vue.component('Loading', Loading);
Vue.component('modal-message', ModalMessage);
Vue.component('home-layout', HomeLayout);
Vue.component('page-layout', PageLayout);