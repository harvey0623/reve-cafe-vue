import axios from 'axios';
import router from '@/router/index.js';
import store from '@/store/index.js';
import { storageObj } from '@/plugins/index.js';

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
   let statusCode = error.response.status;
   if (statusCode !== 401) return Promise.reject(error);
   let responseUrl = error.response.config.url;
   let currentRoute = router.app.$route;
   let skipApiUrl = {
      me: '/third_party_auth/me'
   };
   for (let key in skipApiUrl) {
      let regx = new RegExp(skipApiUrl[key]);
      let isSkip = regx.test(responseUrl);
      if (isSkip) return Promise.reject(error); 
   }
   store.commit('auth/setUserInfo', {});
   store.dispatch('cart/clearAllCart');
   storageObj.removeItem('userInfo');
   console.log(currentRoute)
   if (currentRoute.meta.auth || currentRoute.meta.needBackToSingin) {
      storageObj.setSessionItem('backInfo', { url: currentRoute.fullPath });
      router.replace('/signin');
   }
   return Promise.reject(error);
});

export const httpConfig = function(option) {
   return instance(option);
}