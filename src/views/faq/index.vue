<template>
   <div class="faq-block">
      <div class="faq-outer">
         <FaqAccordion v-if="hasFaq" :faqList="faqInfo.data"></FaqAccordion>
      </div>
      <Loading v-show="isLoading"></Loading>
   </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from '@vue/composition-api'
import { faqApi } from '@/api/index.js'
import FaqAccordion from '@/component/FaqAccordion/index.vue'
export default {
   components: { FaqAccordion },
   metaInfo () {
      return {
         title: '常見問題',
      }
   },
   setup(props, { root }) {
      let isLoading = ref(false);
      let faqInfo = reactive({ data: [] });
      let hasFaq = computed(() => faqInfo.data.length > 0);
      
      onMounted(async() => {
         let faqResponse = await faqApi.get();
         faqInfo.data = faqResponse.aaData;
      });

      return { isLoading, faqInfo, hasFaq }
   }
}
</script>

<style lang="scss" scoped>
.faq-outer {
   max-width: 800px;
   margin: 0 auto;
}
</style>