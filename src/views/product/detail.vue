<template>
   <div class="product_detail">
      <h3 class="categoryName text-primary">商品名稱</h3>
      <div class="product-top">
         <div class="slideBox">
            <ImageGallery></ImageGallery>
         </div>
         <div class="descBox">
            <p class="productNum">xasxsaxas</p>
            <p class="productName">xasxasxsa</p>
            <p class="productSummary">xasxsaxasxsa</p>
            <ul class="specList">
               <li class="spec-item active">巴西咖啡</li>
               <li class="spec-item">巴西咖啡</li>
            </ul>
            <div class="edit-block">
               <div class="edit-row">
                  <span>溫層:</span>
                  <span>常溫</span>
               </div>
               <div class="edit-row">
                  <span>數量:</span>
                  <select class="form-control">
                     <option value="1">1</option>
                  </select>
               </div>
               <div class="edit-row">
                  <span>價格:</span>
                  <span class="price text-primary">${{ 1000 | currency }}</span>
               </div>
               <div class="edit-row btnBox no-mt">
                  <button class="cart">加入購物車</button>
                  <button class="immediate">直接購買</button>
               </div>
            </div>
         </div>
      </div>
      <div class="product-middle">
         xsaxasxas
      </div>
   </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch, onBeforeMount } from '@vue/composition-api'
import ImageGallery from '@/component/Product/ImageGallery.vue';
export default {
   name: 'product-detail',
   components: { ImageGallery },
   metaInfo () {
      return {
        title: '商品詳情',
      }
   },
   setup(props, { root }) {
      let productCode = ref('');
      

      onBeforeMount(() => {
         productCode.value = root.$route.params.productCode;
      });

      onMounted(() => {
         
      });

      watch(() => root.$route, (val) => {
         console.log(val)
      })

      return {  }
   }
}
</script>

<style src="./scss/detail.scss" lang="scss"></style>