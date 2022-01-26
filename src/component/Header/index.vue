<template>
   <header>
      <div class="header-top">
         <div class="my-container">
           <a href="javascript:;" class="dropdown-block" @mouseenter="openDropdownMenu = true" @mouseleave="openDropdownMenu = false">
               所有商品
               <i class="fal fa-chevron-down"></i>
               <div class="header-dropdown-menu" :class="{mouseenter:openDropdownMenu}">
                  <router-link v-for="(menu,index) in menuList.data" :key="index" :to="menu.urlParams" @click.native="openDropdownMenu = false">{{ menu.title }}</router-link>
               </div>
            </a>
           <router-link to="/brand">品牌介紹</router-link>
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
import { ref, reactive, computed, onMounted } from '@vue/composition-api'
import { productApi, activityApi } from '@/api/index.js'
import { createActivityInfo } from '@/composition-api/index.js'
export default {
   setup(props, { root }) {
      let menuList = reactive({ data: [] });
      let openDropdownMenu = ref(false);
      let isLogin = computed(() => root.$store.getters['auth/isLogin']);
      let memberLink = computed(() => isLogin.value ? '/member/profile' : '/signin');
      let cartTotal = computed(() => root.$store.getters['cart/subTotal']);
      let showCartCount = computed(() => cartTotal.value > 0);
      let activityInfo = createActivityInfo();

      let createMenuSchema = (arr) => {
         return arr.reduce((prev, current) => {
            let { iId:id, vCategoryName:title } = current;
            if (id === 0) return prev;
            prev.push({ id, title, urlParams: { name: 'product_category', query: { categoryId: id }}});
            return prev;
         }, []);
      }

      let getFirstActivityItem = (arr) => {
         let obj = arr[0];
         let routeName = activityInfo[obj.code][obj.iType].routeName;
         return {
            id: obj.iId, 
            title: '優惠活動', 
            urlParams: { name: routeName, query: { activityId: obj.iId, activityType: obj.code }}
         };
      }

      let createMenuList = async() => {
         let categoryResponse = await productApi.product_category({});
         let list = createMenuSchema(categoryResponse.aaData);
         let [fullInfo, matchInfo] = await Promise.all([
            activityApi.fullAmount(),
            activityApi.red_with_green()
         ]);
         let activityList = fullInfo.aaData.concat(matchInfo.aaData);
         if (activityList.length === 0) return menuList.data = list;
         let activityItem = getFirstActivityItem(activityList);
         menuList.data = [ ...list, activityItem ];
      }

      onMounted(() => {
         createMenuList();
      });

      return { openDropdownMenu, memberLink, cartTotal, showCartCount, isLogin, menuList };
   }
}
</script>

<style lang="scss" src="./index.scss" scoped></style>