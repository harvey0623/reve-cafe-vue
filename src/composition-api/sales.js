import { ref, reactive, computed, onMounted, watch } from '@vue/composition-api'
import { activityApi, activityCartApi } from '@/api/index.js'

export const salesInfo = (root, activityType) => {
   let isLoading = ref(false);
   let productList = reactive({ data: [] });
   let pickedList = reactive({ data: [] });
   let cartMessage = ref('');
   let cartModal = ref(null);
   let productModal = ref(null);
   let activityId = computed(() => root.$store.state.activity.activityInfo.id);
   let criteria = computed(() => root.$store.getters['activity/criteria']);

   let hasProduct = computed(() => productList.data.length > 0);

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
      let { status, iPromoAmount, iPromoType, iRedAmount } = criteria.value;
      if (status === 0) return '';
      if (iRedAmount !== undefined) return '';
      let currencyFormat = root.$options.filters.currency;
      let mappingText = {
         1: `固定優惠${currencyFormat(iPromoAmount)}元`,
         2: `折扣優惠${currencyFormat(iPromoAmount)}元`,
         3: `折扣優惠${iPromoAmount}%`
      };
      return `已符合滿額折扣(${mappingText[iPromoType]})`;
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

   let getActivityProduct = async(key) => {
      let response = await activityApi[key]({ activity_product_promotions_ids: activityId.value });
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

   let getCanAddToCart = (can) => can;

   let introHandler = (payload) => {
      productModal.value.updateIntroInfo(payload);
      productModal.value.openModal();
   }

   let addCart = async(isAchieved, type) => {
      if (!getCanAddToCart(isAchieved)) return;
      isLoading.value = true;
      let cartParams = createCartParams(activityId.value, type);
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
      await getActivityProduct(activityType);
      isLoading.value = false;
   });

   watch(activityId, async() => {
      isLoading.value = true;
      await getActivityProduct(activityType);
      isLoading.value = false;
   });

   return { isLoading, productList, pickedList, cartMessage, cartModal, productModal, activityId, criteria, hasProduct, pickedCount, pickedTotalDollar, discountText, getActivityProduct, pickedHandler, changeSpecCount, removePickedItem, createCartParams, introHandler, addCart }
}