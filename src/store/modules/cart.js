import { cartApi, activityCartApi } from '@/api/index.js';

export const cartStore = {
   namespaced: true,
   state: () => ({
      normalCartList: [],
      activityCartList: []
   }),
   mutations: {
      setNormalCartList(state, payload) {
         state.normalCartList = payload;
      },
      setActivityCartList(state, payload) {
         state.activityCartList = payload;
      },
   },
   getters: {
      subTotal(state) {
         let normalTotal = state.normalCartList.length;
         let activityTotal = state.activityCartList.length;
         return normalTotal + activityTotal;
      }
   },
   actions: {
      async getNormalCart({ commit }) {
         let cartResponse = await cartApi.getCart();
         let payload = cartResponse.status === 1 ? cartResponse.aaData : [];
         commit('setNormalCartList', payload);
         return cartResponse;
      },
      async getActivityCart({ commit }) {
         let cartResponse = await activityCartApi.getCart();
         let payload = cartResponse.status === 1 ? cartResponse.aaData : [];
         commit('setActivityCartList', payload);
         return cartResponse;
      }
   }
}