<template>
   <router-link class="popular-item" :to="{name: 'product_detail', params:{ productCode: productCode }}">
      <div class="imgBox">
         <img :src="productImageUrl" alt="">
      </div>
      <div class="descBox">
         <p class="name">{{ productName }}</p>
         <p class="intro text-input">{{ productSummary }}</p>
         <div class="price">
            <span class="text-input">NT${{ normalPrice | currency }}</span>
            <span class="text-primary">NT${{ promotePrice | currency }}</span>
         </div>
      </div>
   </router-link>
</template>

<script>
import { toRefs, computed } from '@vue/composition-api'
export default {
   props: {
      recommendInfo: { type: Object, required: true }
   },
   setup(props) {
      let { recommendInfo:info } = toRefs(props);

      let productImageUrl = computed(() => {
         let images = info.value.vImages;
         return images.length > 0 ? images[0] : '';
      });

      let productName = computed(() => info.value.vProductName);
      let productSummary = computed(() => info.value.vProductSummary);
      let singleSpec = computed(() => info.value.specs[0]);
      let normalPrice = computed(() => singleSpec.value.price.iSpecPrice);
      let promotePrice = computed(() => singleSpec.value.price.iSpecPromoPrice);
      let productCode = computed(() => info.value.vProductCode);

      return { productImageUrl, productName, productSummary, normalPrice, promotePrice, productCode }
   }
}
</script>

<style lang="scss">
.popular-item {
   flex: 1;
   max-width: 400px;
   margin-right: 25px;
   padding: 15px;
   border: 1px solid map-get($borderColor, outer);
   @extend %clearFix;
   cursor: pointer;
   >* {
      float: left;
   }
   >.imgBox {
      @include size(180px, 135px);
      >img {
         display: block;
         @include size(100%);
         object-fit: cover;
      }
   }
   >.descBox {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: calc(100% - 180px);
      height: 135px;
      padding-top: 8px;
      padding-left: 12px;
      padding-bottom: 8px;
      >.name {
         margin-bottom: 5px;
         @include setWebkitLimitRow(1);
      }
      >.intro {
         @include setWebkitLimitRow(2);
         font-size: 15px;
      }
      >.price {
         display: flex;
         justify-content: space-between;
         flex-wrap: wrap;
         margin-top: auto;
         font-size: 15px;
         >.text-input {
            text-decoration-line: line-through;
         }
      }
   }
}
</style>