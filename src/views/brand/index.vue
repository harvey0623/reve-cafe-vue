<template>
   <div class="brnand-block">
      <div class="outline-block" v-show="hasContent" v-html="brandContent"></div>
      <Loading v-show="isLoading"></Loading>
   </div>
</template>

<script>
import { ref, computed, onMounted } from '@vue/composition-api'
import { scenesApi } from '@/api/index.js'
export default {
   metaInfo () {
      return {
         title: '品牌介紹',
      }
   },
   setup(props) {
      let brandContent = ref('');
      let isLoading = ref(false);
      let hasContent = computed(() => brandContent.value !== '');
      
      onMounted(async() => {
         isLoading.value = true;
         let response = await scenesApi.brand();
         brandContent.value = response.aaData.vDetail;
         isLoading.value = false;
      });
      
      return { brandContent, isLoading, hasContent }
   }
}
</script>

<style>

</style>