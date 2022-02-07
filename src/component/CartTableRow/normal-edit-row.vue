<template>
   <tr>
      <td class="td-input">
         <input type="checkbox" class="hook-checkbox cart">
      </td>
      <td>
         <div class="productInfo">
            <div class="imgBox">
               <img src="" alt="">
            </div>
            <div class="descBox">
               <p class="title">product name</p>
               <p class="spec text-input">spec</p>
            </div>
         </div>
      </td>
      <td>
         <select class="form-control">
            <option value="">1</option>
         </select>
      </td>
      <td>
         <p>${{ 1 | currency }}</p>
      </td>
      <td>
         <p class="text-primary">${{ 1000 | currency }}</p>
      </td>
      <td>
         <i class="fal fa-trash-alt"></i>
      </td>
   </tr>
</template>

<script>
import { ref } from '@vue/composition-api'
export default {
   setup(props, { emit }) {

      return {}
   }
}
</script>

<style>

</style>