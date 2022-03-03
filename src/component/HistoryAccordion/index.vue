<template>
   <div class="history-accordion-block">
      <AccordionItem 
         v-for="accordion in accordionList" 
         :key="accordion.iId" 
         :accordion="accordion"
         :invoiceList="invoiceInfo.list"
         ref="accordionItem"
      ></AccordionItem>
   </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from '@vue/composition-api'
import { orderApi } from '@/api/index.js'
import AccordionItem from './item.vue'
export default {
   components: { AccordionItem },
   props: {
      accordionList: { type: Array, required: true }
   },
   setup(props) {
      let accordionItem = ref(null);
      let invoiceInfo = reactive({ list: [] });

      onMounted(async() => {
         invoiceInfo.list = await orderApi.invoice().then(res => res.aaData);
      });

      return { invoiceInfo, accordionItem }
   }
}
</script>

<style lang="scss" scoped>

</style>