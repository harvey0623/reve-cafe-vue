<template src="./html/quota.html"></template>

<script>
import { ref, reactive, computed, onMounted, watch } from '@vue/composition-api'
import { activityApi } from '@/api/index.js'
import fullAmountItem from '@/component/ActivityProduct/fullAmountItem.vue'
import fullAmountRow from '@/component/ActivityRow/FullAmountRow.vue'
export default {
   name: 'quota',
   components: { fullAmountItem, fullAmountRow },
   metaInfo () {
      return {
        title: '滿額活動',
      }
   },
   setup(props, { root }) {
      let isLoading = ref(false);
      let productList = reactive({ data: [] });
      let pickedList = reactive({ data: [] });
      let activityId = computed(() => root.$store.state.activity.activityInfo.id);
      let criteria = computed(() => root.$store.getters['activity/criteria']);
      let pickedCount = computed(() => pickedList.data.length);
      
      let pickedTotalDollar = computed(() => {
         return pickedList.data.reduce((prev, current) => {
            prev += current.buyCount * current.price;
            return prev;
         }, 0);
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

      onMounted(() => {
         getActivityProduct();
      });

      watch(activityId, (val) => {
         
      });

      return { isLoading, criteria, pickedList, pickedCount, productList, pickedHandler, changeSpecCount, removePickedItem, pickedTotalDollar }
   }
}
</script>

<style lang="scss">
.criteriaBox {
   .text-primary {
      margin: 0 3px;
   }
   .reached {
      color: red;
   }
}
</style>