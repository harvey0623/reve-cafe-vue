<template>
   <div class="cart-step1-blockc cart-outer">
      <div class="temperature-list">
         <TemperatureItem v-for="item in temperatureTab" :key="item.iId" :info="item" :temperatureType="temperatureType" @setTab="setTab"></TemperatureItem>
      </div>
      <div class="picked-cart-outer">
         <table class="picked-cart-table">
            <thead>
               <tr>
                  <th width="100">
                     <input type="checkbox" class="hook-checkbox cart" v-model="isAllChecked" @change="changeAllChecked">全選
                  </th>
                  <th>商品品項</th>
                  <th>數量</th>
                  <th>單價</th>
                  <th>總價</th>
                  <th>刪除</th>
               </tr>
            </thead>
            <tbody>
               <tr is=""></tr>
            </tbody>
         </table>
         <div class="picked-cart-summary">
            <p>共<span class="text-primary">{{ 1 | currency }}</span>商品</p>
            <p>商品小計</p>
            <p>${{ 1 | currency }}</p>
         </div>
      </div>

      <Loading v-show="isLoading"></Loading>
   </div>
</template>

<script>
import { ref, reactive ,computed, onMounted } from '@vue/composition-api'
import { productApi, thirdPartyMemberApi, cartApi, activityCartApi } from '@/api/index.js'
import TemperatureItem from '@/component/TemperatureItem/index.vue'
import NormalEditRow from '@/component/CartTableRow/normal-edit-row.vue'
import ActivityEditRow from '@/component/CartTableRow/activity-edit-row.vue'
import MatchEditRow from '@/component/CartTableRow/match-edit-row.vue'
export default {
   name: 'cart-step1',
   components: { TemperatureItem, NormalEditRow, ActivityEditRow, MatchEditRow },
   setup(props, { root }) {
      let cartList = reactive({ data: [] });
      let temperatureList = reactive({ data: [] });
      let temperatureType = ref('');
      let isAllChecked = ref(true);
      let isLoading = ref(false);

      let temperatureTab = computed(() => temperatureList.data.filter(item => item.count > 0));

      let changeAllChecked = () => {
         
      }

      let setTab = (payload) => {
         temperatureType.value = payload.type;
      }

      let createUid = () => {
         let d = new Date().getTime()
         let d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
         return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16;
            if (d > 0) {
               r = (d + r) % 16 | 0;
               d = Math.floor(d / 16);
            } else {
               r = (d2 + r) % 16 | 0;
               d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
         });
      }

      let checkNormalCart = async(lists) => {
         if (lists.length === 0) return [];
         let arr = [];
         for (let list of lists) {
            if (list.spec.iSpecStock <= 0) {
               await cartApi.removeCart(list.iId);
            } else {
               arr.push({
                  ...list,
                  uid: createUid(),
                  temperatureCode: list.product.temperature.vTemperatureCode,
                  isChecked: isAllChecked.value,
                  componentName: 'NormalEditRow',
                  cartType: 'normal',
               });
            }
         }
         return arr;
      }

      let checkActivityCart = async(lists) => {
         if (lists.length === 0) return [];
         let arr = [];
         for (let list of lists) {
            let hasStock = list.cart.every(item => item.spec.iSpecStock > 0);
            if (!hasStock) {
               await activityCartApi.removeCart(list.iId);
            } else {
               let isFullAmountCode = list.vActivityCode === 'full_amount';
               let componentName = isFullAmountCode ? 'ActivityEditRow' : 'MatchEditRow';
               arr.push({
                  ...list,
                  uid: createUid(),
                  temperatureCode: list.temperature.vTemperatureCode,
                  isChecked: isAllChecked.value,
                  componentName,
                  cartType: 'activity'
               });
            }
         }
         return arr;
      }

      let createTemperatureList = (temperatureArr, cartArr) => {
         return temperatureArr.reduce((prev, current) => {
            let filterArr = cartArr.filter(item => item.temperatureCode === current.vTemperatureCode);
            prev.push({ ...current, count: filterArr.length });
            return prev;
         }, []);
      }

      let getCartAndtemperature = async() => {
         let [normalCartInfo, activityCartInfo, temperatureInfo] = await Promise.all([
            cartApi.getCart(), activityCartApi.getCart(), productApi.product_temperature()
         ]);
         let [ normalList, activityList ] = await Promise.all([
            checkNormalCart(normalCartInfo.aaData), checkActivityCart(activityCartInfo.aaData)
         ]);
         let allCart = normalList.concat(activityList);
         temperatureList.data = createTemperatureList(temperatureInfo.aaData, allCart);
         cartList.data = normalList.concat(activityList);
         temperatureType.value = temperatureTab.value.length !== 0 ? temperatureTab.value[0].vTemperatureCode : '';
         
      }

      onMounted(async() => {
         isLoading.value = true;
         await getCartAndtemperature();

         isLoading.value = false;
      });

      return { isLoading, isAllChecked, temperatureType, temperatureTab, changeAllChecked, setTab }
   }
}
</script>

<style lang="scss" src="./scss/step1.scss"></style>