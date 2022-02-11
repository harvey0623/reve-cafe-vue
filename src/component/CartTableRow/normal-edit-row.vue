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
               <router-link :to="productUrl" class="title">{{ productName }}</router-link>
               <p class="spec text-input">{{ specName }}</p>
            </div>
         </div>
      </td>
      <td>
         <select class="form-control" v-model.number="specInfo.count" @change="changeCount">
            <option v-for="count in totalStocks" :key="count" :value="count">{{ count }}</option>
         </select>
      </td>
      <td>
         <p>${{ price | currency }}</p>
      </td>
      <td>
         <p class="text-primary">${{ subTotal | currency }}</p>
      </td>
      <td>
         <i class="fal fa-trash-alt" @click="removeHandler"></i>
      </td>
   </tr>
</template>

<script>
import { reactive, computed, toRefs, onMounted } from '@vue/composition-api'
export default {
   props: {
      info: { type: Object, required: true }
   },
   setup(props, { emit }) {
      let { info } = toRefs(props);
      let specInfo = reactive({ id: '', count: 1, list: [] });
      let productName = computed(() => info.value.product.vProductName);
      let specName = computed(() => info.value.spec.vSpecTitle);
      let price = computed(() => info.value.spec.price.iSpecPromoPrice);
      let totalStocks = computed(() => info.value.spec.iSpecStock);
      let subTotal = computed(() => price.value * specInfo.count);
      let productImage = computed(() => {
         let vImages = info.value.product.vImages;
         return vImages.length > 0 ? vImages[0] : '';
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

      let productUrl = computed(() => {
         return {
            name: info.value.routeName,
            params: { productCode: info.value.vProductCode },
            query: { specId: info.value.iSpecId }
         }
      });

      let changeCount = () => {
         emit('changeCount', {
            vProductCode: info.value.vProductCode,
            iSpecId: specInfo.id,
            iCount: specInfo.count,
         });
      }

      let removeHandler = () => {
         emit('remove', {
            cartType: info.value.cartType,
            iId: info.value.iId,
            uid: info.value.uid
         });
      }
      
      onMounted(() => {
         specInfo.count = info.value.iCount <= totalStocks.value ? info.value.iCount : 1;
         specInfo.id = info.value.iSpecId;
      });

      return { specInfo, productName, specName, price, totalStocks, subTotal, productImage, isChecked, productUrl, changeCount, removeHandler }
   }
}
</script>

<style>

</style>