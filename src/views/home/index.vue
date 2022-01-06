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
      <div class="product-block popular">
         <div class="my-container">
            <h3 class="blobk-title text-primary">POPULAR</h3>
            <div class="popular-row">
               <div class="popular-item">
                  <div class="imgBox">
                     <img src="https://fakeimg.pl/300x120/" alt="">
                  </div>
                  <div class="descBox">
                     <p class="name">test</p>
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
import { scenesApi } from '@/api/index.js';
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

      let createBannerList = (arr) => {
         return arr.reduce((prev, current) => {
            prev = prev.concat(current.vImages);
            return prev;
         }, []);
      }
      
      let getBanner = async() => {
         let bannerResponse = await scenesApi.banner();
         bannerList.data = createBannerList(bannerResponse.aaData);
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
      }

      onMounted(() => {
         getBanner();
      });

      return { bannerList }
   }
};
</script>

<style src="./scss/home.scss" lang="scss" scoped></style>
