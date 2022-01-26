<template>
   <div class="modal" :class="{open: isOpen}">
      <div class="modal-dialog">
         <div class="modal-header">
            <h3 class="title text-primary">{{ title }}</h3>
            <!-- <i class="fal fa-times cross"></i> -->
         </div>
         <div class="modal-content">
            <slot name="default"></slot>
         </div>
         <div class="modal-footer">
            <button class="btn-primary" v-if="showCancel" @click="cancelHandler">{{ cancelText }}</button>
            <button class="btn-primary" v-if="showConfirm" @click="confirmHandler">{{ confirmText }}</button>
         </div>
      </div>
   </div>
</template>

<script>
import { ref } from '@vue/composition-api'
export default {
   props: {
      title: { type: String, default: '提示' },
      showCancel: { type: Boolean, default: false },
      showConfirm: { type: Boolean, default: true },
      cancelText: { type: String, default: '取消' },
      confirmText: { type: String, default: '確認' },
   },
   setup(props, { emit }) {
      let isOpen = ref(false);
      let openModal = () => isOpen.value = true;
      let closeModal = () => isOpen.value = false;
      let confirmHandler = () => emit('confirm');
      let cancelHandler = () => {
         emit('cancel');
         closeModal();
      }

      return { isOpen, openModal, closeModal, confirmHandler, cancelHandler };
   }
}
</script>

<style>

</style>