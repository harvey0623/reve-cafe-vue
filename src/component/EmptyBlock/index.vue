<template>
<div class="empty-block">
   <i class="fal fa-exclamation-circle"></i>
   <span>{{ text }}</span>
</div>
</template>

<script>
import { ref } from '@vue/composition-api'
export default {
   props: {
      text: { type: String, default: '' }
   },
   setup() {

      return {}
   }
}
</script>

<style lang="scss" scoped>
.empty-block {
   @extend %centerFlex;
   font-size: 23px;
   >.fa-exclamation-circle {
      color: red;
   }
   >span {
      margin-left: 5px;
   }
}
</style>