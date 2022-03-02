<template src="./html/step2.html"></template>

<script>
import { ref, reactive, onMounted, watch } from '@vue/composition-api'
import { orderApi } from '@/api/index.js'
import NormalDetailRow from '@/component/CartTableRow/normal-detail-row.vue'
import ActivityDetailRow from '@/component/CartTableRow/activity-detail-row.vue'
import MatchDetailRow from '@/component/CartTableRow/match-detail-row.vue'
export default {
   name: 'cart-step2',
   components: { NormalDetailRow, ActivityDetailRow, MatchDetailRow },
   setup(props, { root }) {
      let orderNumber = ref('');
      let tipMessage = ref('');
      let isLoading = ref(true);
      let tipModal = ref(null);
      let cartList = reactive({ data: [] });

      let processNormalProduct = (arr) => {
         return arr.reduce((prev, current) => {
            prev.push({ ...current, cartType: 'normal', componentName: 'NormalDetailRow' });
            return prev;
         }, []);
      }

      let processActivityProduct = (arr) => {
         return arr.reduce((prev, current) => {
            let componentName = current.vActivityCode === 'full_amount' ? 'ActivityDetailRow' : 'MatchDetailRow';
            prev.push({ ...current, cartType: 'activity', componentName });
            return prev;
         }, []);
      }

      let getOrderDetail = async() => {
         let response = await orderApi.order_detail({ vOrderNum: orderNumber.value });
         if (response.status === 0) {
            tipMessage.value = response.message;
            tipModal.value.openModal();
            return;
         }
         let normalCart =  processNormalProduct(response.aaData.meta);
         let activityCart = processActivityProduct(response.aaData.activity_product_promotions_meta_bundle);
         cartList.data = normalCart.concat(activityCart);
      }

      let tipHandler = () => root.$router.replace('/');

      onMounted(async() => {
         isLoading.value = true;
         orderNumber.value = root.$route.query.orderNumber;
         await getOrderDetail();
         isLoading.value = false;
      });

      watch(() => root.$route, async(val) => {
         isLoading.value = true;
         orderNumber.value = val.query.orderNumber;
         await getOrderDetail();
         isLoading.value = false;
      });

      return { cartList, isLoading, tipMessage, tipModal, tipHandler }
   }
}
</script>

<style lang="scss" src="./scss/step1.scss">

</style>