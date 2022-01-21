import { activityApi } from '@/api/index.js';
import { createActivityInfo } from '@/composition-api/index.js'
const activityInfo = createActivityInfo();

const createActivityList = (arr) => {
   return arr.reduce((prev, current) => {
      let { iId, iType, code } = current;
      let routeName = activityInfo[code][iType].routeName;
      prev.push({ 
         ...current, 
         urlParams: { name: routeName, query: { activityId: iId, activityType: code }} 
      });
      return prev;
   }, []);
}

export const activityStore = {
   namespaced: true,
   state: () => ({
      activityList: [],
      activityInfo: { id: 0, type: ''}
   }),
   mutations: {
      setActivityList(state, payload) {
         state.activityList = payload;
      },
      setActivtyInfo(state, payload) {
         state.activityInfo = payload;
      }
   },
   getters: {
      targetActivity(state) {
         let obj = state.activityList.find(item => {
            let sameId = item.iId === state.activityInfo.id;
            let sameType = item.code === state.activityInfo.type;
            return sameId && sameType;
         });
         if (obj !== undefined) return obj;
         else return null;
      },
      bannerImage(state, getters) {
         if (getters.targetActivity === null) return '';
         else return getters.targetActivity.vImages[0] || '';
      },
      criteria(state, getters) {
         let activityObj = getters.targetActivity;
         if (activityObj === null) return { status: 0 };
         let { code, iPromoType, iPromoAmount, iMinAmount, iGreenAmount, iRedAmount } = activityObj;
         let mapping = {
            full_amount: { iPromoType, iPromoAmount, iMinAmount },
            red_with_green: { iGreenAmount, iRedAmount }
         };
         let criteria = mapping[code];
         if (criteria === undefined) return { status: 0 };
         criteria.status = 1;
         return criteria;
      }
   },
   actions: {
      async getActivity({ commit }) {
         let [fullAmount, matchAmount] = await Promise.all([ 
            activityApi.fullAmount(),
            activityApi.red_with_green()
         ]);
         let allActivity = fullAmount.aaData.concat(matchAmount.aaData);
         if (allActivity.length === 0) {
            commit('setActivityList', []);
            return { status: 0, message: '目前沒有活動' };
         }
         let list = createActivityList(allActivity);
         commit('setActivityList', list);
         return { status: 1, message: '' };
      }
   }
}