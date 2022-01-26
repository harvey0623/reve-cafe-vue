<template src="./html/quanity.html"></template>

<script>
import { computed } from '@vue/composition-api'
import { createSalesInfo } from '@/composition-api/index.js'
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
      let { isLoading, productList, pickedList, cartMessage, cartModal, productModal, activityId, criteria, hasProduct, pickedCount, pickedTotalDollar, discountText, getActivityProduct, pickedHandler, changeSpecCount, removePickedItem, introHandler, addCart } = createSalesInfo(root, 'full_amount_meta');

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

      return { isLoading, productList, pickedList, cartMessage, cartModal, productModal, activityId, criteria, hasProduct, pickedCount, pickedTotalDollar, discountText, getActivityProduct, pickedHandler, changeSpecCount, removePickedItem, introHandler, addCart, isAchieved, discountPrice }
   }
}
</script>

<style>

</style>