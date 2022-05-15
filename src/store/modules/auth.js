import _ from 'lodash';
import { thirdPartyAuthApi } from '@/api/index.js';
import { storageObj } from '@/plugins/index.js';

export const auth = {
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
         let userInfo = storageObj.getItem('cafe-userInfo');
         if (_.isEmpty(userInfo)) return;
         commit('setUserInfo', userInfo);
      },
      async login({ commit }, payload) {
         let loginResponse = await thirdPartyAuthApi.login(payload);
         if (loginResponse.status === 1) {
            let token = loginResponse.aaData.access_token;
            commit('setUserInfo', { token });
            storageObj.setItem('cafe-userInfo', { token });
         }
         return loginResponse;
      },
      async logout({ commit }) {
         let logoutResponse = await thirdPartyAuthApi.logout();
         if (logoutResponse.status === 1) {
            commit('setUserInfo', {});
            storageObj.removeItem('cafe-userInfo');
         }
         return logoutResponse;
      },
      async checkLoginStatus({ commit }) {
         let meResponse = await thirdPartyAuthApi.me();
         if (meResponse.status === 1) return { status: 1 };
         let refreshResponse = await thirdPartyAuthApi.refresh();
         if (refreshResponse.status === 1) {
            let token = refreshResponse.aaData.access_token;
            commit('setUserInfo', { token });
            storageObj.setItem('cafe-userInfo', { token });
         } else {
            commit('setUserInfo', {});
            storageObj.removeItem('cafe-userInfo');
         }
         return refreshResponse;
      },
   }
}