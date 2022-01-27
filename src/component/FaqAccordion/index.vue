<template>
   <div class="faq-accrodion">
      <FaqItem v-for="faq in faqList" :key="faq.iId" :faqInfo="faq" ref="faqItems" @toggle="toggleHandler"></FaqItem>
   </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import FaqItem from './FaqItem.vue'
export default {
   components: { FaqItem },
   props: {
      faqList: { type: Array, required: true }
   },
   setup() {
      let faqItems = ref(null);
      
      let toggleHandler = (id) => {
         faqItems.value.forEach(item => {
            if (item.$props.faqInfo.iId !== id) item.slideUp();
         });
      }

      return { faqItems, toggleHandler }
   }
}
</script>

<style lang="scss">
.faq-accrodion {
   padding: 20px;
   border: 1px solid map-get($borderColor, outer);
   >.faq-item {
      @include elGutter(padding-bottom, 20px);
      @include elGutter(margin-bottom, 20px);
      border-bottom: 1px dashed map-get($borderColor, outer);
      &:last-child {
         border-bottom: none;
      }
      >.faq-header {
         @extend %bwtFlex;
         cursor: pointer;
         >.left {
            >i {
               font-size: 22px;
            }
            span {
               margin-left: 8px;
               transform: translateY(-2px);
            }
         }
         >.right {
            font-size: 14px;
            transition: transform 0.25s;
            &.rotate {
               transform: rotate(-180deg);
            }
         }
      }
      >.faq-body {
         >.inner {
            padding: 10px 20px 0 30px;
         }
      }
   }
}
</style>