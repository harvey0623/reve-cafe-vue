<template>
   <div class="home">
      <div class="banner-block">
         <div id="banner-swiper" class="swiper">
            <div class="swiper-wrapper">
               <div class="swiper-slide" v-for="(banner,index) in bannerList.data" :key="index">
                  <img :src="banner" alt="">
               </div>
            </div>
            <div class="swiper-pagination"></div>
         </div>
      </div>
      <div class="section-block popular">
         <div class="my-container">
            <h3 class="blobk-title text-primary">POPULAR</h3>
            <div class="popular-row">
               <div class="popular-item" v-for="count in 3" :key="count">
                  <div class="imgBox">
                     <img src="https://fakeimg.pl/300x120/" alt="">
                  </div>
                  <div class="descBox">
                     <p class="name">test</p>
                     <p class="intro text-input">saxsaxasxsaxsa</p>
                     <div class="price">
                        <span class="text-input">NT$2000</span>
                        <span class="text-primary">NT$2000</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="section-block">
         <div class="my-container">
            <h3 class="blobk-title text-primary">PRODUCT</h3>
            <div class="product-row">
               <div class="product-item" v-for="count in 10" :key="count">
                  <div class="imgBox">
                     <img src="https://fakeimg.pl/500x220/" alt="">
                  </div>
                  <div class="descBox">
                     <p class="name">cxaxsaxsa</p>
                     <p class="intro text-input">xadsxsaxdscxdscdscdscdscdscds</p>
                     <div class="price">
                        <span class="text-input">NT$2000</span>
                        <span class="text-primary">NT$2000</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { ref, reactive ,onMounted } from '@vue/composition-api'
import { scenesApi, productApi } from '@/api/index.js';
import Swiper from 'swiper/swiper-bundle.min.js';
export default {
   name: 'Home',
   components: {},
   metaInfo () {
      return {
        title: '首頁',
      }
   },
   setup(props, { root }) {
      let bannerList = reactive({ data: [] });
      let isLoading = ref(false);

      let createBannerList = (arr) => {
         return arr.reduce((prev, current) => {
            prev = prev.concat(current.vImages);
            return prev;
         }, []);
      }
      
      let setBanner = async(payload) => {
         bannerList.data = createBannerList(payload.aaData);
         await root.$nextTick();
         new Swiper('#banner-swiper', {
            loop: true,
            autoplay: {
               delay: 4000,
               disableOnInteraction: false
            },
            pagination: {
               el: '.swiper-pagination',
            },
         });
         return;
      }

      onMounted(async() => {
         isLoading.value = true;
         let allResponse = await Promise.all([ scenesApi.banner() ]);
         let [ bannerInfo ] = allResponse;
         setBanner(bannerInfo);
         isLoading.value = false;
      });

      return { bannerList, isLoading }
   }
};
</script>

<style src="./scss/home.scss" lang="scss" scoped></style>
