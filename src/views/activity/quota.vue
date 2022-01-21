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
            console.log(prev)
            return prev;
         }, 0);
      });

      let createProductList = (arr) => {
         let list = arr.filter(item => {
            let isNotNull = item.product !== null && item.full_amount_meta_spec !== null;
            if (!isNotNull) return false;
            else return item.full_amount_meta_spec.iSpecStock > 0;
         });
         return list;
      }

      let getActivityProduct = async() => {
         let response = await activityApi.full_amount_meta({ activity_product_promotions_ids: activityId.value });
         productList.data = createProductList(response.aaData);
      }

      let pickedHandler = (payload) => {
         let pickedObj = pickedList.data.find(item => item.productCode === payload.productCode && item.specId === payload.specId);
         if (pickedObj === undefined) {
            pickedList.data.push({ ...payload, buyCount: 1 });
         } else {
            pickedObj.buyCount += 1;
         }
      }

      let changeSpecCount = (payload) => {
         let pickedObj = pickedList.data.find(item => item.specId === payload.specId);
         if (pickedObj === undefined) return;
         pickedObj.buyCount = payload.count;
      }

      let removePickedItem = ({ specId }) => {
         let index = pickedList.data.find(item => item.specId === specId);
         if (index === -1) return;
         pickedList.data.splice(index, 1);
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