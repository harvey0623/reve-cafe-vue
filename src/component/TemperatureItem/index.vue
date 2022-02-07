<template>
   <div class="temperature-item">常溫</div>
</template>

<script>
import { computed } from '@vue/composition-api'
export default {
   props: {

   },
   setup(props, { emit }) {


      return {}
   }
}
</script>

<style lang="scss" scoepd>
.temperature-item {
   @extend %centerFlex;
   min-width: 100px;
   height: 40px;
   @include elGutter(margin-right, 12px);
   color: map-get($fontColor, primary);
   background-color: #fff;
   border: 1px solid map-get($borderColor, primary);
   font-size: 18px;
   cursor: pointer;
   &:hover,
   &.active {
      color: #fff;
      background-color: map-get($elBgColor, primary);
   }
}
</style>