<template>
   <div class="brnand-block">
      <div class="outline-block" v-html="brandContent"></div>
   </div>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api'
import { scenesApi } from '@/api/index.js'
export default {
   metaInfo () {
      return {
         title: '品牌介紹',
      }
   },
   setup(props) {
      let brandContent = ref('');
      
      onMounted(async() => {
         let response = await scenesApi.brand();
         brandContent.value = response.aaData.vDetail;
      });
      
      return { brandContent }
   }
}
</script>

<style>

</style>