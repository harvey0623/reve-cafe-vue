<template>
   <li
      class="spec-item text-input" 
      :class="{active:isActive, disabled:!hasStock}"
      @click="clickSpec">
      {{ specName }}
   </li>
</template>

<script>
import { computed, toRefs } from '@vue/composition-api'
export default {
   props: {
      spec: { type: Object, required: true },
      currentSpecId: { type: Number, required: true }
   },
   setup(props, { emit }) {
      let { spec, currentSpecId } = toRefs(props);
      let specName = computed(() => spec.value.vSpecTitle);
      let isActive = computed(() => spec.value.iId === currentSpecId.value);
      let hasStock = computed(() => spec.value.stockInfo.iStockCount > 0);

      let clickSpec = () => {
         if (!hasStock.value) return;
         if (isActive.value) return;
         emit('change-spec', { 
            specId: spec.value.iId,
            stockTotal: spec.value.stockInfo.iStockCount,
            price: spec.value.price.iSpecPromoPrice
         });
      }

      return { specName, isActive, hasStock, clickSpec }
   }
}
</script>

<style lang="scss" scoepd>
.spec-item {
   min-width: 80px;
   padding: 5px 10px;
   @include elGutter(margin-right, 5px);
   border: 1px solid map-get($borderColor, outer);
   background-color: #fff;
   text-align: center;
   cursor: pointer;
   &.active {
      border-color: map-get($borderColor, primary);
      background-color: map-get($elBgColor, primary);
      color: #fff;
   }
   &.disabled {
      opacity: 0.5;
      border-color: map-get($borderColor, outer);
      background-color: #fff;
      color: map-get($fontColor, input);
      cursor: not-allowed;
   }
}
</style>