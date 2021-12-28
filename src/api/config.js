import axios from 'axios';
import router from '@/router/index.js';
import store from '@/store/index.js';
import { storageObj } from '@/plugins/storage/index.js';

const instance = axios.create({
   baseURL: process.env.VUE_APP_API_BASEURL,
});

instance.interceptors.request.use(function (config) {
   let userInfo = storageObj.getItem('userInfo');
   config.headers.Authorization = userInfo !== null ? `Bearer ${userInfo.token}` : '';
   return config;
}, function (error) {
   return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
   return response;
}, function (error) {
   // if (error.response.status === 401) {
   //    store.commit('auth/setLogin', false);
   //    store.commit('setExpirePopup', true);
   //    router.push('/').catch(err => {});
   // }
   return Promise.reject(error);
});

export const httpConfig = function(option) {
   return instance(option);
}