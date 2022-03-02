<template>
   <tr>
      <td>
         <div class="productInfo">
            <div class="imgBox">
               <img :src="productImage" alt="">
            </div>
            <div class="descBox">
               <p>{{ activityName }}</p>
               <ul class="combo-list">
                  <li class="combo-item" v-for="bundle in bundleList" :key="bundle.iId">
                     <span>{{ bundle.iCount | currency }}</span>
                     <span class="text-input">x</span>
                     <span class="name">{{ bundle.vProductName }}</span>
                  </li>
               </ul>
            </div>
         </div>
      </td>
      <td>{{ bundleCount | currency }}</td>
      <td>${{ bundlePrice | currency }}</td>
      <td class="text-primary">${{ subTotal | currency }}</td>
   </tr>
</template>

<script>
import { computed, toRefs } from '@vue/composition-api'
export default {
   props: {
      info: { type: Object, required: true }
   },
   setup(props, { emit }) {
      let { info } = toRefs(props);
      console.log(info.value)
      let bundleCount = computed(() => info.value.iCount);
      let bundlePrice = computed(() => info.value.iBundlePromoPrice);
      let subTotal = computed(() => bundleCount.value * bundlePrice.value);
      let activityName = computed(() => info.value.vTitle);
      let productImage = computed(() => {
         let vImage = info.value.vImages;
         return vImage.length > 0 ? vImage[0] : '';
      });

      let bundleList = computed(() => {
         return info.value.meta.reduce((prev, current) => {
            prev.push({
               iId: current.iId,
               iCount: current.iCount,
               vProductName: current.vProductName
            });
            return prev;
         }, []);
      });


      return { bundleCount, bundlePrice, subTotal, activityName, productImage, bundleList }
   }
}
</script>

<style>

</style>