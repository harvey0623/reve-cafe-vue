<template>
   <div class="red-green-product">
      <div class="imgBox" @click="introHandler">
         <img :src="productImage" alt="">
         <span class="label" :style="{backgroundColor:labelInfo.backgroundColor}">{{ labelInfo.title }}</span>
      </div>
      <div class="descBox">
         <p class="name">{{ productName }}</p>
         <p class="spec text-input">{{ specName }}</p>
         <p class="price text-primary">${{ specPrice | currency }}</p>
         <button class="btn-hover-activity" :class="{disabled:isFullStock}" @click="pickHandler">選購</button>
      </div>
   </div>
</template>

<script>
import { computed, toRefs } from '@vue/composition-api'
export default {
   props: {
      productInfo: { type: Object, required: true },
      mappingLabel: { type: Object, required: true }
   },
   setup(props, { emit }) {
      let { productInfo, mappingLabel } = toRefs(props);
      let productImage = computed(() => productInfo.value.product.vImages[0] || '');
      let productName = computed(() => productInfo.value.product.info.vProductName);
      let specName = computed(() => productInfo.value.full_amount_meta_spec.vSpecTitle);
      let specPrice = computed(() => productInfo.value.full_amount_meta_spec.price.iSpecPromoPrice);
      let totalStock =  computed(() => productInfo.value.full_amount_meta_spec.iSpecStock);
      let isFullStock = computed(() => productInfo.value.buyCount >= totalStock.value);

      let labelInfo = computed(() => {
         return {
            title: mappingLabel.value[productInfo.value.iPromoType].title,
            backgroundColor: mappingLabel.value[productInfo.value.iPromoType].backgroundColor
         }
      });

      let pickHandler = () => {
         if (isFullStock.value) return;
         emit('picked', {
            iId: productInfo.value.iId,
            productCode: productInfo.value.product.vProductCode,
            productName: productName.value,
            specName: specName.value,
            specId: productInfo.value.full_amount_meta_spec.iId,
            totalStock: totalStock.value,
            price: specPrice.value,
            imageUrl: productImage.value,
            iPromoType: productInfo.value.iPromoType
         });
      }

      let introHandler = () => {
         emit('intro', {
            productName: productName.value,
            specName: specName.value,
            productSummary: productInfo.value.product.vProductSummary,
            price: specPrice.value,
            imageUrl: productImage.value
         });
      }

      return { productImage, productName, specName, specPrice, pickHandler, isFullStock, labelInfo, introHandler }
   }
}
</script>

<style lang="scss" scoped>
.red-green-product {
   flex: 0 0 25%;
   padding: 0 10px;
   margin-bottom: 30px;
   cursor: pointer;
   >.imgBox {
      position: relative;
      padding-top: 75%;
      >img {
         position: absolute;
         left: 0;
         top: 0;
         @include size(100%);
         object-fit: cover;
      }
      >.label {
         position: absolute;
         right: 8px;
         top: 8px;
         @include size(30px);
         line-height: 30px;
         text-align: center;
         border-radius: 50%;
         color: #fff;
      }
   }
   >.descBox {
      padding-top: 8px;
      padding-left: 8px;
      >* {
         @include elGutter(margin-bottom, 5px);
      }
      >.name {
         font-size: 18px;
         @include setWebkitLimitRow(1);
      }
      >.spec {
         font-size: 15px;
      }
      >.btn-hover-activity {
         @include size(100%, 38px);
         font-size: 16px;
      }
   }
}
</style>