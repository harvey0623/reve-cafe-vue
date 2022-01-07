<template>
   <div class="product_detail">

   </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch, onBeforeMount } from '@vue/composition-api'
export default {
   name: 'product-detail',
   components: {},
   metaInfo () {
      return {
        title: '商品詳情',
      }
   },
   setup(props, { root }) {
      let productCode = ref('');
      

      onBeforeMount(() => {
         productCode.value = root.$route.params.productCode;
      });

      onMounted(() => {
         
      });

      watch(() => root.$route, (val) => {
         console.log(val)
      })

      return {  }
   }
}
</script>

<style>

</style>