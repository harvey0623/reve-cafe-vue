<template>
   <div class="faq-item">
      <div class="faq-header" @click="toggleHandler">
         <div class="left">
            <i class="fas fa-question-circle text-primary"></i>
            <span>{{ faqInfo.vTitle }}</span>
         </div>
         <div class="right" :class="{rotate:isOpen}">
            <i class="fal fa-chevron-down text-input"></i>
         </div>
      </div>
      <slide-up-down class="faq-body" :active="isOpen" :duration="250" @open-start="setCanClick(false)" @open-end="setCanClick(true)" @close-start="setCanClick(false)" @close-end="setCanClick(true)">
         <div class="inner text-input" v-html="faqInfo.vContent"></div>
      </slide-up-down>
   </div>
</template>

<script>
import { ref, toRefs } from '@vue/composition-api'
export default {
   props: {
      faqInfo: { type: Object, required: true }
   },
   setup(props, { emit }) {
      let isOpen = ref(false);
      let canClick = ref(true);
      let isFirst = ref(true);

      let toggleHandler = () => {
         if (!canClick.value) return;
         isOpen.value = !isOpen.value;
         if (!isOpen.value) return;
         emit('toggle', props.faqInfo.iId);
      }

      let setCanClick = (val) => {
         if (isFirst.value) {
            isFirst.value = false;
            return;
         }
         canClick.value = val;
      }

      let slideUp = () => isOpen.value = false; 


      return { ...toRefs(props.faqInfo), isOpen, canClick, toggleHandler, setCanClick, slideUp }
   }
}
</script>

<style>

</style>