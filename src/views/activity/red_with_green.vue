<template src="./html/redwithgreen.html"></template>

<script>
import { ref, reactive, computed } from '@vue/composition-api'
import { createSalesInfo } from '@/composition-api/index.js'
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
      let { isLoading, productList, pickedList, cartMessage, cartModal, productModal, activityId, criteria, hasProduct, pickedTotalDollar, pickedHandler, changeSpecCount, removePickedItem, introHandler, addCart } = createSalesInfo(root, 'red_with_green_meta');
      let markType = ref('0');
      let markList = reactive({ 
         0: { title: '全部', fontColor: '#BC9F75', borderColor: '#BC9F75', backgroundColor: '#fff', hoverFontColor: '#fff', hoverBackgroundColor: '#BC9F75' },
         1: { title: '紅標', fontColor: '#FF0000', borderColor: '#FF0000', backgroundColor: '#fff', hoverFontColor: '#fff', hoverBackgroundColor: '#FF0000' },
         2: { title: '綠標',  fontColor: '#04a978', borderColor: '#04a978', backgroundColor: '#fff', hoverFontColor: '#fff', hoverBackgroundColor: '#04a978' },
      });
      let mappingLabel = reactive({
         1: { title: '紅', backgroundColor: '#FF0000' },
         2: { title: '綠', backgroundColor: '#04a978' }
      });

      let filterProductList = computed(() => {
         if (markType.value === '0') return productList.data;
         return productList.data.filter(item => item.iPromoType === parseInt(markType.value));
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
      
      return { isLoading, pickedList,cartMessage, activityId, criteria, cartModal, productModal, markType, markList, filterProductList, pickedHandler, changeSpecCount, removePickedItem, pickedTotalDollar, hasProduct, redItemCount, greenItemCount, isAchieved, introHandler, introHandler, addCart, mappingLabel }
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