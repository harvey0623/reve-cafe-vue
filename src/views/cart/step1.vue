<template>
   <div class="cart-step1-blockc cart-outer">
      <div class="temperature-list">
         <TemperatureItem></TemperatureItem>
      </div>
      <div class="picked-cart-outer">
         <table class="picked-cart-table">
            <thead>
               <tr>
                  <th width="100">
                     <input type="checkbox" class="hook-checkbox cart">全選
                  </th>
                  <th>商品品項</th>
                  <th>數量</th>
                  <th>單價</th>
                  <th>總價</th>
                  <th>刪除</th>
               </tr>
            </thead>
            <tbody>
               <tr is=""></tr>
            </tbody>
         </table>
         <div class="picked-cart-summary">
            <p>共<span class="text-primary">{{ 1 | currency }}</span>商品</p>
            <p>商品小計</p>
            <p>${{ 1 | currency }}</p>
         </div>
      </div>

      <Loading v-show="isLoading"></Loading>
   </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import TemperatureItem from '@/component/TemperatureItem/index.vue'
import normalEditRow from '@/component/CartTableRow/normal-edit-row.vue'
import activityEditRow from '@/component/CartTableRow/activity-edit-row.vue'
export default {
   name: 'cart-step1',
   components: { TemperatureItem, normalEditRow, activityEditRow },
   setup(props, { root }) {
      let isLoading = ref(false);
      

      return { isLoading }
   }
}
</script>

<style lang="scss" src="./scss/step1.scss"></style>