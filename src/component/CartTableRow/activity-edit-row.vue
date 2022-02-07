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
               <ul class="combo-list">
                  <li class="combo-item">
                     <span>{{ 100 | currency }}</span>
                     <span class="text-input">x</span>
                     <span class="name">texasxsa</span>
                  </li>
               </ul>
            </div>
         </div>
      </td>
      <td>{{ 1000 | currency }}</td>
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