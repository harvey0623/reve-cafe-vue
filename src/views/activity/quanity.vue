<template src="./html/quanity.html"></template>

<script>
import { ref, reactive, computed, onMounted, watch } from '@vue/composition-api'
import { activityApi, activityCartApi } from '@/api/index.js'
import fullAmountItem from '@/component/ActivityProduct/fullAmountItem.vue'
import fullAmountRow from '@/component/ActivityRow/FullAmountRow.vue'
export default {
   name: 'quanity',
   components: { fullAmountItem, fullAmountRow },
   metaInfo () {
      return {
        title: '滿件活動',
      }
   },
   setup(props, { root }) {
      let isLoading = ref(false);
      let productList = reactive({ data: [] });
      let pickedList = reactive({ data: [] });
      let cartMessage = ref('');
      let cartModal = ref(null);
      let activityId = computed(() => root.$store.state.activity.activityInfo.id);
      let criteria = computed(() => root.$store.getters['activity/criteria']);

      let pickedCount = computed(() => {
         return pickedList.data.reduce((prev, current) => {
            prev += current.buyCount;
            return prev; 
         }, 0);
      });

      let pickedTotalDollar = computed(() => {
         return pickedList.data.reduce((prev, current) => {
            prev += current.buyCount * current.price;
            return prev;
         }, 0);
      });
      
      let discountText = computed(() => {
         let { status, iPromoAmount, iPromoType } = criteria.value;
         if (status === 0) return '';
         let currencyFormat = root.$options.filters.currency;
         let mappingText = {
            1: `固定優惠${currencyFormat(iPromoAmount)}元`,
            2: `折扣優惠${currencyFormat(iPromoAmount)}元`,
            3: `折扣優惠${iPromoAmount}%`
         };
         return `已符合滿額折扣(${mappingText[iPromoType]})`;
      });

      let isAchieved = computed(() => {
         if (criteria.value.status === 0) return false;
         return pickedCount.value >= criteria.value.iMinAmount;
      });

      let discountPrice = computed(() => {
         if (!isAchieved.value) return 0;
         let { iPromoType, iPromoAmount } = criteria.value;
         if (iPromoType === 1) {
            return iPromoAmount;
         } else if (iPromoType === 2) {
            return pickedTotalDollar.value - iPromoAmount;
         } else if (iPromoType === 3) {
            let ratio = iPromoAmount / 100;
            let discountAmount = Math.ceil(pickedTotalDollar.value * ratio);
            return pickedTotalDollar.value - discountAmount;
         } else {
            return 0;
         }
      });

      let createProductList = (arr) => {
         let list = arr.filter(item => {
            let isNotNull = item.product !== null && item.full_amount_meta_spec !== null;
            if (!isNotNull) return false;
            else return item.full_amount_meta_spec.iSpecStock > 0;
         });
         list.forEach(item => item.buyCount = 0);
         return list;
      }

      let getActivityProduct = async() => {
         let response = await activityApi.full_amount_meta({ activity_product_promotions_ids: activityId.value });
         productList.data = createProductList(response.aaData);
         pickedList.data = [];
      }

      let setProductBuyCount = (payload) => {
         let productObj = productList.data.find(item => item.iId === payload.iId);
         if (productObj === undefined) return;
         productObj.buyCount = payload.count;
      }

      let pickedHandler = (payload) => {
         let { iId } = payload;
         let pickedObj = pickedList.data.find(item => item.iId === iId);
         if (pickedObj === undefined) {
            pickedList.data.push({ ...payload, buyCount: 1 });
            setProductBuyCount({ iId, count: 1 });
         } else {
            pickedObj.buyCount += 1;
            setProductBuyCount({ iId, count: pickedObj.buyCount });
         }
      }

      let changeSpecCount = (payload) => {
         let pickedObj = pickedList.data.find(item => item.iId === payload.iId);
         if (pickedObj === undefined) return;
         pickedObj.buyCount = payload.count;
         setProductBuyCount({ iId: payload.iId, count: payload.count });
      }

      let removePickedItem = (iId) => {
         let index = pickedList.data.find(item => item.iId === iId);
         if (index === -1) return;
         pickedList.data.splice(index, 1);
         setProductBuyCount({ iId, count: 0 });
      }

      let createCartParams = (promotionId, code) => {
         let products = pickedList.data.reduce((prev, current) => {
            let { productCode, specId, buyCount } = current;
            prev.push({ vProductCode: productCode, iSpecId: specId, iCount: buyCount });
            return prev;
         }, []);
         return { iActivityProductPromotionsId: promotionId, code, products };
      }

      let addCart = async() => {
         if (!isAchieved.value) return;
         isLoading.value = true;
         let cartParams = createCartParams(activityId.value, 'full_amount');
         let cartResponse = await activityCartApi.addCart(cartParams);
         if (cartResponse.status === 1) {
            cartMessage.value = cartResponse.message;
            pickedList.data = [];
            productList.data.forEach(item => item.buyCount = 0);
            root.$store.dispatch('cart/getAllCart');
         }
         cartModal.value.openModal();
         isLoading.value = false;
      }

      onMounted(async() => {
         isLoading.value = true;
         await getActivityProduct();
         isLoading.value = false;
      });

      watch(activityId, async() => {
         isLoading.value = true;
         await getActivityProduct();
         isLoading.value = false;
      });

      return { isLoading, criteria, pickedList, pickedCount, productList, pickedHandler, changeSpecCount, removePickedItem, pickedTotalDollar, discountText, isAchieved, discountPrice, addCart, cartMessage, cartModal }
   }
}
</script>

<style>

</style>