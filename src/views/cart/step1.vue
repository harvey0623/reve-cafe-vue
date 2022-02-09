<template src="./html/step1.html"></template>

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

      let hasCart = computed(() => cartList.data.length > 0 );

      let temperatureTab = computed(() => temperatureList.data.filter(item => item.count > 0));

      let filterCartList = computed(() => cartList.data.filter(item => item.temperatureCode === temperatureType.value));

      let filterCartCount = computed(() => filterCartList.value.length);

      let normalCartDollar = computed(() => {
         let arr = filterCartList.value.filter(item => item.cartType === 'normal' && item.isChecked);
         return arr.reduce((prev, current) => {
            prev += current.iCount * current.spec.price.iSpecPromoPrice;
            return prev;
         }, 0);
      });

      let activityCartDollar = computed(() => {
         let arr = filterCartList.value.filter(item => item.cartType === 'activity' && item.isChecked);
         return arr.reduce((prev, current) => {
            prev += current.iCount * current.iBundlePromoPrice;
            return prev;
         }, 0);
      });

      let filterCartSubTotal = computed(() => normalCartDollar.value + activityCartDollar.value);

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

      let setTab = (payload) => {
         temperatureType.value = payload.type;
         isAllChecked.value = filterCartList.value.every(item => item.isChecked);
      }

      let checkTabStatus = () => {
         let targetTab = temperatureList.data.find(item => item.vTemperatureCode === temperatureType.value);
         targetTab.count = filterCartCount.value;
         if (filterCartCount.value > 0) return;
         if (temperatureTab.value.length > 0) {
            setTab({ type: temperatureTab.value[0].vTemperatureCode });
         } else {
            temperatureType.value = '';
         }
      }

      let singleCheck = (payload) => {
         let obj = filterCartList.value.find(item => item.uid === payload.uid);
         obj.isChecked = payload.isChecked;
         isAllChecked.value = filterCartList.value.every(item => item.isChecked);
      }

      let changeAllChecked = () => {
         filterCartList.value.forEach(item => item.isChecked = isAllChecked.value);  
      }

      let changeCount = async(payload) => {
         let { vProductCode, iSpecId, iCount } = payload;
         let targetObj = filterCartList.value.find(item => {
            return item.vProductCode === vProductCode && item.iSpecId === iSpecId;
         });
         targetObj.iCount = iCount;
      }

      let removeCartItem = async(payload) => {
         isLoading.value = true;
         let { cartType, uid, iId } = payload;
         let mappingApi = { normal: cartApi, activity: activityCartApi };
         let response = await mappingApi[cartType].removeCart(iId);
         if (response.status === 0) return isLoading.value = false;
         let index = cartList.data.findIndex(item => item.uid ===  uid);
         cartList.data.splice(index, 1);
         root.$store.dispatch('cart/getAllCart');
         checkTabStatus();
         isLoading.value = false;
      }

      onMounted(async() => {
         isLoading.value = true;
         await getCartAndtemperature();

         isLoading.value = false;
      });

      return { isLoading, isAllChecked, temperatureType, hasCart, temperatureTab, filterCartList, filterCartCount, filterCartSubTotal, changeAllChecked, setTab, changeCount, singleCheck, removeCartItem }
   }
}
</script>

<style lang="scss" src="./scss/step1.scss"></style>