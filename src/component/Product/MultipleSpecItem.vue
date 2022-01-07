<template>
   <router-link class="multiple-spec-item" :to="{name: 'product_detail', params:{ productCode: productCode }}">
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
import { computed, toRefs } from '@vue/composition-api'
export default {
   props: {
      productInfo: { type: Object, required: true }
   },
   setup(props) {
      let { productInfo:info } = toRefs(props);

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
.multiple-spec-item {
   flex: 0 0 25%;
   padding: 0 12px;
   margin-bottom: 40px;
   >.imgBox {
      position: relative;
      padding-top: 62.5%;
      margin-bottom: 10px;
      >img {
         position: absolute;
         left: 0;
         top: 0;
         @include size(100%);
         object-fit: cover;
      }
   }
   >.descBox {
      >* {
         @include elGutter(margin-bottom, 8px);
      }
      >.name {
         @include setWebkitLimitRow(1);
      }
      >.intro {
         font-size: 15px;
         @include setWebkitLimitRow(2);
      }
      >.price {
         display: flex;
         justify-content: space-between;
         font-size: 15px;
         >.text-input {
            text-decoration-line: line-through;
         }
      }
   }
}
</style>