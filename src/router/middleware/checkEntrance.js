import store from '@/store/index.js';
export const checkEntrance = (to, from, next) => {
   if (store.getters['auth/isLogin']) {
      return next('/')
   } else {
      return next();
   }
}