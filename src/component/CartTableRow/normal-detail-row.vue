<template>
   <tr>
      <td>
         <div class="productInfo">
            <div class="imgBox">
               <img :src="productImage" alt="">
            </div>
            <div class="descBox">
               <p>{{ productName }}</p>
               <p class="spec text-input">{{ specName }}</p>
            </div>
         </div>
      </td>
      <td>{{ buyCount | currency }}</td>
      <td>
         <p>${{ price | currency }}</p>
      </td>
      <td>
         <p class="text-primary">${{ subTotal | currency }}</p>
      </td>
   </tr>
</template>

<script>
import { computed, toRefs } from '@vue/composition-api'
export default {
   props: {
      info: { type: Object, required: true }
   },
   setup(props) {
      let { info } = toRefs(props);
      let productName = computed(() => info.value.vProductName);
      let specName = computed(() => info.value.spec.vSpecTitle);
      let price = computed(() => info.value.iPromoPrice);
      let buyCount = computed(() => info.value.iCount);
      let subTotal = computed(() => price.value * buyCount.value);
      let productImage = computed(() => {
         let vImages = info.value.vImages;
         return vImages.length > 0 ? vImages[0] : '';
      });

      return { productName, specName, price, buyCount, subTotal, productImage }
   }
}
</script>

<style>

</style>