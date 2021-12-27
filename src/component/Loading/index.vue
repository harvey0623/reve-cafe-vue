<template>
   <div id="loading">
      <div class="dots">
         <span v-for="(dot,index) in dotList" :key="index" :style="dot.styleText"></span>
	   </div>
   </div>
</template>

<script>
import { ref, computed, onMounted } from '@vue/composition-api'
export default {
   setup() {
      let totalDots = ref(15);
      let dotList = computed(() => {
         let arr = [];
         for (let i = 1; i <= totalDots.value; i++) {
            arr.push({ styleText: `--i:-${i}` });
         }
         return arr;
      });
      
      return { dotList };
   }
}
</script>

<style lang="scss" scoped>
#loading {
   position: fixed;
   left: 0;
   top: 0;
   @include size(100%, 100vh);
   background-color: rgba(#000, 0.55);
   z-index: 2000;
   >.dots {
      @extend %posCenter;
      >span {
         position: absolute;
         @include size(12px);
         background-color: #fff;
         border-radius: 50%;
         transform: rotate(calc(var(--i) * (360deg / 15))) translateY(60px);
         animation: animate 1.5s linear infinite;
         animation-delay: calc(var(--i) * 0.1s);
         opacity: 0;
         @keyframes animate {
            0%{
               opacity: 1;
            }
            100%{
               opacity: 0;
            }
         }
      }
   }
}
</style>