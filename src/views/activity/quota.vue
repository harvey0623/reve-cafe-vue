<template src="./html/quota.html"></template>

<script>
import { ref, reactive, computed, onMounted, watch } from '@vue/composition-api'
import { activityApi } from '@/api/index.js'
export default {
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

      onMounted(() => {
         getActivityProduct();
      });

      watch(activityId, (val) => {
         
      })

      return { isLoading, criteria, pickedList, pickedCount }
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