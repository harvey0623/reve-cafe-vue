<template src="./html/redwithgreen.html"></template>

<script>
import { ref, reactive, computed, onMounted, watch } from '@vue/composition-api'
import { activityApi, activityCartApi } from '@/api/index.js'
import MarkItem from '@/component/MarkItem/index.vue'
import RedGreenItem from '@/component/ActivityProduct/redGreenItem.vue'
import RedGreenRow from '@/component/ActivityRow/RedGreenRow.vue'
export default {
   name: 'redwithgreen',
   components: { MarkItem, RedGreenItem, RedGreenRow },
   metaInfo () {
      return {
        title: '紅配綠活動',
      }
   },
   setup(props, { root }) {
      let isLoading = ref(false);
      let productList = reactive({ data: [] });
      let pickedList = reactive({ data: [] });
      let cartMessage = ref('');
      let markType = ref('0');
      let cartModal = ref(null);
      let markList = reactive({ 
         0: { title: '全部', fontColor: '#BC9F75', borderColor: '#BC9F75', backgroundColor: '#fff', hoverFontColor: '#fff', hoverBackgroundColor: '#BC9F75' },
         1: { title: '紅標', fontColor: '#FF0000', borderColor: '#FF0000', backgroundColor: '#fff', hoverFontColor: '#fff', hoverBackgroundColor: '#FF0000' },
         2: { title: '綠標',  fontColor: '#04a978', borderColor: '#04a978', backgroundColor: '#fff', hoverFontColor: '#fff', hoverBackgroundColor: '#04a978' },
      });
      let activityId = computed(() => root.$store.state.activity.activityInfo.id);
      let criteria = computed(() => root.$store.getters['activity/criteria']);

      let filterProductList = computed(() => {
         if (markType.value === '0') return productList.data;
         return productList.data.filter(item => item.iPromoType === parseInt(markType.value));
      });

      let pickedTotalDollar = computed(() => {
         return pickedList.data.reduce((prev, current) => {
            prev += current.buyCount * current.price;
            return prev;
         }, 0);
      });

      let redItemCount = computed(() => {
         return pickedList.data.reduce((prev, current) => {
            if (current.iPromoType !== 1) return prev;
            prev += current.buyCount; 
            return prev;
         }, 0);
      });

      let greenItemCount = computed(() => {
         return pickedList.data.reduce((prev, current) => {
            if (current.iPromoType !== 2) return prev;
            prev += current.buyCount; 
            return prev;
         }, 0);
      });

      let isAchieved = computed(() => {
         let { iRedAmount, iGreenAmount } = criteria.value;
         return redItemCount.value === iRedAmount && greenItemCount.value === iGreenAmount;
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

      let getActivityProduct = async() => {
         let response = await activityApi.red_with_green_meta({ activity_product_promotions_ids: activityId.value });
         productList.data = createProductList(response.aaData);
         pickedList.data = [];
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
         let cartParams = createCartParams(activityId.value, 'red_with_green');
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

      return { isLoading, pickedList,cartMessage, activityId, criteria, cartModal, markType, markList, filterProductList, pickedHandler, changeSpecCount, removePickedItem, pickedTotalDollar, redItemCount, greenItemCount, isAchieved, addCart }
   }
}
</script>

<style lang="scss">
.mark-block {
   display: flex;
   align-items: center;
   margin-bottom: 20px;
}
</style>