<template>
   <tr>
      <td>
         <div class="profile">
            <div class="imgBox">
               <img :src="pickInfo.imageUrl" alt="">
            </div>
            <div class="descBox">
               <p class="name">{{ pickInfo.productName }}</p>
               <p class="text-input">{{ pickInfo.specName }}</p>
            </div>
         </div>
      </td>
      <td>
         <select class="form-control" v-model.number="buyCount">
            <option v-for="count in pickInfo.totalStock" :key="count" :value="count">{{ count }}</option>
         </select>
      </td>
      <td>
         <p>${{ pickInfo.price | currency }}</p>
      </td>
      <td>
         <p class="text-primary">${{ totalDollar | currency }}</p>
      </td>
      <td>
         <i class="far fa-trash-alt text-input" @click="removeHandler"></i>
      </td>
   </tr>
</template>

<script>
import { ref, reactive, computed, toRefs } from '@vue/composition-api'
export default {
   props: {
      pickInfo: { type: Object, required: true }
   },
   setup(props, { emit }) {
      console.log(props)
      let { pickInfo:info } = toRefs(props);
      let buyCount = computed({
         get() {
            return info.value.buyCount;
         },
         set(val) {
            emit('changeSpecCount', { specId: info.value.specId, count: val });
         }
      });

      let totalDollar = computed(() => buyCount.value * info.value.price);

      let removeHandler = () => {
         emit('remove', { specId:info.value.specId});
      }

      return { ...toRefs(props.pickInfo), buyCount, totalDollar, removeHandler }
   }
}
</script>

<style>

</style>