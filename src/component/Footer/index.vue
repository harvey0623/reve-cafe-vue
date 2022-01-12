<template>
   <footer>
      <div class="footer-top">
         <div class="my-container">
            <div class="footer-logo-box">
               <img :src="require('@/assets/img/footer-logo.png')" alt="">
            </div>
            <div class="footer-info">
               <ul class="infoList">
                  <!-- <li class="info-item">
                     <p class="name">關於黑浮</p>
                     <div class="link-block">
                        <router-link to="/">Q&A</router-link>
                     </div>
                  </li> -->
                  <li class="info-item">
                     <p class="name">相關政策</p>
                     <div class="link-block">
                        <router-link to="/">隱私權政策</router-link>
                        <router-link to="/">會員服務條款</router-link>
                     </div>
                  </li>
               </ul>
            </div>
         </div>
      </div>
      <div class="footer-bottom">
         <div class="my-container">
            <p class="copyright">Copyright © 2021 Revecoffeeroaster.E-commerce Powered by EasyStore</p>   
         </div>
      </div>
   </footer>
</template>

<script>
import { onMounted } from '@vue/composition-api'
export default {
   setup(props, { root }) {


      onMounted(() => {

      });

      return {}
   }
}
</script>

<style src="./scss/index.scss" lang="scss" scoped></style>