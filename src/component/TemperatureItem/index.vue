<template>
   <div class="temperature-item" :class="{active:isActive}" @click="clickHandler">{{ temperatureTitle }}</div>
</template>

<script>
import { computed, toRefs } from '@vue/composition-api'
export default {
   props: {
      info: { type: Object, required: true },
      temperatureType: { type: String, default: '' }
   },
   setup(props, { emit }) {
      let { info, temperatureType } = toRefs(props);
      let temperatureTitle = computed(() => info.value.vTemperatureTitle);
      let isActive = computed(() => info.value.vTemperatureCode === temperatureType.value);

      let clickHandler = () => {
         if (isActive.value) return;
         emit('setTab', { type: info.value.vTemperatureCode });
      }

      return { temperatureTitle, isActive, clickHandler }
   }
}
</script>

<style lang="scss" scoepd>
.temperature-item {
   @extend %centerFlex;
   min-width: 100px;
   height: 40px;
   @include elGutter(margin-right, 10px);
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