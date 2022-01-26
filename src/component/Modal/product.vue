<template>
   <div class="modal product" :class="{open: isOpen}">
      <div class="modal-dialog">
         <div class="modal-header">
            <h3 class="title">{{ introInfo.productName }}</h3>
            <i class="fal fa-times cross" @click="closeModal"></i>
         </div>
         <div class="modal-content">
            <div class="imgBox">
               <img :src="introInfo.imageUrl" alt="">
            </div>
            <div class="descBox">
               <p>規格: {{ introInfo.specName }}</p>
               <p class="text-input">{{ introInfo.productSummary }}</p>
               <p class="text-primary">活動價格: {{ introInfo.price | currency }}</p>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api'
export default {
   setup(props) {
      let isOpen = ref(false);
      let introInfo = reactive({ productName: '', productSummary: '', specName: '', imageUrl: '', price: 0 });

      let openModal = () => isOpen.value = true;
      let closeModal = () => isOpen.value = false;
      let updateIntroInfo = (payload) => {
         for (let key in  introInfo) {
            introInfo[key] = payload[key];
         }
      }

      return { isOpen, introInfo, openModal, closeModal, updateIntroInfo };
   }
}
</script>

<style>

</style>