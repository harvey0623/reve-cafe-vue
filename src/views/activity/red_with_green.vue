<template src="./html/redwithgreen.html"></template>

<script>
import { ref, reactive, computed, onMounted, watch } from '@vue/composition-api'
import { activityApi, activityCartApi } from '@/api/index.js'
import MarkItem from '@/component/MarkItem/index.vue'
export default {
   name: 'redwithgreen',
   components: { MarkItem },
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
         1: { title: '紅標', fontColor: '#FF0000', borderColor: '#FF0000', backgroundColor: '#fff', hoverFontColor: '#fff',hoverBackgroundColor: '#FF0000' },
         2: { title: '綠標',  fontColor: '#04a978', borderColor: '#04a978', backgroundColor: '#fff', hoverFontColor: '#fff', hoverBackgroundColor: '#04a978' },
      });
      let activityId = computed(() => root.$store.state.activity.activityInfo.id);
      let criteria = computed(() => root.$store.getters['activity/criteria']);

      let filterProductList = computed(() => {
         if (markType.value === '0') return productList.data;
         return productList.data.filter(item => item.iPromoType === parseInt(markType.value));
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
         let response = await activityApi.red_with_green_meta({ activity_product_promotions_ids: activityId.value });
         productList.data = createProductList(response.aaData);
         pickedList.data = [];
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

      return { isLoading, pickedList,cartMessage, activityId, criteria, cartModal, markType, markList, filterProductList }
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