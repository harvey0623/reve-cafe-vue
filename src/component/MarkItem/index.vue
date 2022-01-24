<template>
   <div class="mark-item" :class="{active:isActive}" :style="styleInfo" @click="clickHandler">{{ markTitle }}</div>
</template>

<script>
import { computed, toRefs } from '@vue/composition-api'
export default {
   props: {
      markInfo: { type: Object, required: true },
      markKey: { type: String, required: true },
      markType: { type: String, required: true },
   },
   setup(props, { emit }) {
      let { markInfo, markKey, markType } = toRefs(props);

      let markTitle = computed(() => markInfo.value.title);

      let styleInfo = computed(() => {
         return { 
            '--mark-font-color': markInfo.value.fontColor,
            '--mark-border-color': markInfo.value.borderColor,
            '--mark-hover-font-color': markInfo.value.hoverFontColor,
            '--mark-hover-background-color': markInfo.value.hoverBackgroundColor,
         }
      });

      let isActive = computed(() => markKey.value === markType.value);

      let clickHandler = () => {
         if (isActive.value) return;
         emit('markType', markKey.value);
      }

      return { markTitle, styleInfo, isActive, clickHandler }
   }
}
</script>

<style lang="scss" scoped>
.mark-item {
   min-width: 100px;
   height: 40px;
   line-height: 40px;
   @include elGutter(margin-right, 10px);
   text-align: center;
   border: 1px solid var(--mark-border-color);
   color: var(--mark-font-color);
   background-color: #fff;
   cursor: pointer;
   transition: background-color 0.2s, color 0.2s;
   &:hover {
      background-color: var(--mark-hover-background-color);
      color: var(--mark-hover-font-color);
   }
   &.active {
      background-color: var(--mark-hover-background-color);
      color: var(--mark-hover-font-color);
   }
}
</style>