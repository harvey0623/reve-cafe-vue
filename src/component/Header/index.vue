<template>
   <header>
      <div class="header-top">
         <div class="my-container">
           <a href="javascript:;" class="dropdown-block" @mouseenter="openDropdownMenu = true" @mouseleave="openDropdownMenu = false">
               所有商品
               <i class="fal fa-chevron-down"></i>
               <div class="header-dropdown-menu" :class="{mouseenter:openDropdownMenu}">
                  <router-link to="/" @click.native="openDropdownMenu = false">優惠活動</router-link>
               </div>
            </a>
           <router-link to="/">品牌介紹</router-link>
           <router-link to="/">聯絡我們</router-link>
         </div>
      </div>
      <div class="header-bottom">
         <div class="my-container">
            <router-link to="/" class="logo-box">
               <img :src="require('@/assets/img/header-logo.png')" alt="">
            </router-link>
            <div class="search-block">
               <div class="input-box">
                  <input type="text" class="form-control" placeholder="Search">
                  <i class="fal fa-search"></i>
               </div>
            </div>
            <div class="feature-block">
               <router-link :to="memberLink" class="feature-item">
                  <i class="fal fa-user"></i>
                  <p class="text-primary">會員中心</p>
               </router-link>
               <router-link to="/" class="feature-item" v-if="isLogin">
                  <i class="fal fa-shopping-cart"></i>
                  <p class="text-primary">購物車</p>
                  <span class="cart-count" v-show="showCartCount">{{ cartTotal }}</span>
               </router-link>
            </div>
         </div>
      </div>
   </header>
</template>

<script>
import { ref, computed, onMounted } from '@vue/composition-api'
export default {
   setup(props, { root }) {
      let openDropdownMenu = ref(false);
      let isLogin = computed(() => root.$store.getters['auth/isLogin']);
      let memberLink = computed(() => isLogin.value ? '/' : '/signin');
      let cartTotal = computed(() => root.$store.getters['cart/subTotal']);
      let showCartCount = computed(() => cartTotal.value > 0);

      onMounted(() => {
         if (!isLogin.value) return;
         root.$store.dispatch('cart/getAllCart');
      });

      return { openDropdownMenu, memberLink, cartTotal, showCartCount, isLogin };
   }
}
</script>

<style lang="scss" src="./index.scss" scoped></style>