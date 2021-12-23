<template>
   <header>
      <div class="header-top">
         <div class="my-container">
           
         </div>
      </div>
      <div class="header-bottom">
         <div class="my-container">
            <router-link to="/" class="logo-box">
               <img :src="require('@/assets/img/header-logo.png')" alt="">
            </router-link>
            <div class="search-block">
               <div class="input-box">
                  <input type="text" class="my-input" placeholder="Search">
                  <i class="fal fa-search"></i>
               </div>
            </div>
            <div class="feature-block">
               <router-link to="/" class="feature-item">
                  <i class="fal fa-user"></i>
                  <p class="text-primary">會員中心</p>
               </router-link>
               <router-link to="/" class="feature-item">
                  <i class="fal fa-shopping-cart"></i>
                  <p class="text-primary">購物車</p>
                  <span class="cart-count">10</span>
               </router-link>
            </div>
         </div>
      </div>
   </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" src="./index.scss" scoped></style>