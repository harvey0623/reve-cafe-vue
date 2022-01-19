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