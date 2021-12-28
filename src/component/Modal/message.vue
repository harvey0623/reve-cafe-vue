<template>
   <div class="modal" :class="{open: isOpen}">
      <div class="modal-dialog">
         <div class="modal-header">
            <h3 class="title text-primary">提示</h3>
            <!-- <i class="fal fa-times cross"></i> -->
         </div>
         <div class="modal-content">
            <slot name="default"></slot>
         </div>
         <div class="modal-footer">
            <button class="btn-primary" v-show="showCancel" @click="cancelHandler">取消</button>
            <button class="btn-primary" @click="confirmHandler">確認</button>
         </div>
      </div>
   </div>
</template>

<script>
import { ref } from '@vue/composition-api'
export default {
   props: {
      title: {
         type: String,
         default: '提示'
      },
      showCancel: {
         type: Boolean,
         default: false
      }
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

<style lang="scss" scoped>
$basic-radius: map-get($radius, basic);
$duration: 0.4s;

.modal {
   position: fixed;
   left: 0;
   top: 0;
   @include size(100%, 100vh);
   @extend %centerFlex;
   padding: 15px;
   background-color: rgba(0, 0, 0, 0.8);
   z-index: 1000;
   opacity: 0;
   visibility: hidden;
   transition: opacity $duration, visibility $duration;
   &.open {
      visibility: visible;
      opacity: 1;
      >.modal-dialog {
         opacity: 1;
         transform: translateY(0px);
         transition-delay: 0.1s;
      }
   }
   >.modal-dialog {
      width: 100%;
      max-width: 500px;
      background-color: #fff;
      border-radius: $basic-radius;
      opacity: 0;
      transform: translateY(-50px);
      transition: opacity $duration, transform $duration;
      >div {
         padding-left: 15px;
         padding-right: 15px;
      }
      >.modal-header {
         position: relative;
         padding-top: 12px;
         padding-bottom: 12px;
         background-color: #efefef;
         border-radius: $basic-radius $basic-radius 0 0;
         >.title {
            text-align: center;
            font-size: 22px;
            font-weight: bold;
         }
         >.cross {
            position: absolute;
            right: 12px;
            top: 12px;
            font-size: 28px;
            color: gray;
            cursor: pointer;
         }
      }
      >.modal-content {
         padding-top: 35px;
         padding-bottom: 35px;
         text-align: center;
         font-size: 20px;
      }
      >.modal-footer {
         @extend %centerFlex;
         padding-top: 15px;
         padding-bottom: 15px;
         >button {
            @include size(120px, 38px);
            @include elGutter(margin-right, 12px);
            font-size: 15px;
         }
      }
   }
}
</style>