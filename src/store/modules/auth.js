import _ from 'lodash';
import { thirdPartyAuthApi } from '@/api/index.js';
import { storageObj } from '@/plugins/storage/index.js';

export const authStore = {
   namespaced: true,
   state: () => ({
      userInfo: {},
   }),
   mutations: {
      setUserInfo(state, payload) {
         state.userInfo = payload;
      },
   },
   getters: {
      isLogin(state) {
         return !(_.isEmpty(state.userInfo));
      }
   },
   actions: {
      getUserInfoFromStorage({ commit }) {
         let userInfo = storageObj.getItem('userInfo');
         if (_.isEmpty(userInfo)) return;
         commit('setUserInfo', userInfo);
      },
      async login({ commit }, payload) {
         let loginResponse = await thirdPartyAuthApi.login(payload);
         if (loginResponse.status === 1) {
            commit('setUserInfo', { token: loginResponse.aaData.access_token });
         }
         return loginResponse;
      },
      async logout({ commit }) {
         let logoutResponse = await thirdPartyAuthApi.logout();
         if (logoutResponse.status === 1) {
            commit('setUserInfo', {});
            storageObj.removeItem('userInfo');
         }
         return logoutResponse;
      }
   }
}