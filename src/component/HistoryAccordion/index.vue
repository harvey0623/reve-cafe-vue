<template>
   <div class="history-accordion-block">
      <AccordionItem 
         v-for="accordion in accordionList" 
         :key="accordion.iId" 
         :accordion="accordion"
         :invoiceList="invoiceInfo.list"
         ref="accordionItems"
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
      let accordionItems = ref(null);
      let invoiceInfo = reactive({ list: [] });

      let closeAll = () => {
         if (accordionItems.value === null) return;
         accordionItems.value.forEach(item => item.isOpen = false);
      }

      onMounted(async() => {
         invoiceInfo.list = await orderApi.invoice().then(res => res.aaData);
      });

      return { invoiceInfo, accordionItems, closeAll }
   }
}
</script>

<style lang="scss" scoped>

</style>