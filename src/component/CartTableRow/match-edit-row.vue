<template>
   <tr>
      <td class="td-input">
         <input type="checkbox" class="hook-checkbox cart" v-model="isChecked">
      </td>
      <td>
         <div class="productInfo">
            <div class="imgBox">
               <img :src="productImage" alt="">
            </div>
            <div class="descBox">
               <p class="title">product name</p>
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
      <td>
         <i class="fal fa-trash-alt" @click="removeHandler"></i>
      </td>
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
      let bundleCount = computed(() => info.value.iCount);
      let bundlePrice = computed(() => info.value.iBundlePromoPrice);
      let subTotal = computed(() => bundleCount.value * bundlePrice.value);
      let productImage = computed(() => {
         let vImage = info.value.activity_product_promotions.vImages;
         return vImage.length > 0 ? vImage[0] : '';
      });

      let isChecked = computed({
         get() {
            return info.value.isChecked;
         },
         set(val) {
            emit('singleCheck', {
               uid: info.value.uid,
               isChecked: val
            });
         }
      });

      let bundleList = computed(() => {
         let cart = info.value.cart;
         return cart.reduce((prev, current) => {
            prev.push({
               iId: current.iId,
               iCount: current.iCount,
               vProductName: current.product.vProductName
            });
            return prev;
         }, []);
      });

      let removeHandler = () => {
         emit('remove', {
            cartType: info.value.cartType,
            iId: info.value.iId,
            uid: info.value.uid
         });
      }

      return { bundleCount, bundlePrice, subTotal, productImage, isChecked, bundleList, removeHandler }
   }
}
</script>

<style>

</style>