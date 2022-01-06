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
               <PopularItem 
                  v-for="recommend in recommendList.data" 
                  :key="recommend.iId"
                  :recommendInfo="recommend"
               ></PopularItem>
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
import { scenesApi, productApi } from '@/api/index.js'
import Swiper from 'swiper/swiper-bundle.min.js'
import PopularItem from '@/component/PopularItem/index.vue'
export default {
   name: 'Home',
   components: { PopularItem },
   metaInfo () {
      return {
        title: '首頁',
      }
   },
   setup(props, { root }) {
      let bannerList = reactive({ data: [] });
      let recommendList = reactive({ data: [] });
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
      }

      let processProduct = (payload, endIndex) => {
         let sliceData = payload.aaData.slice(0, endIndex);
         if (sliceData.length === 0) return [];
         return sliceData.reduce((prev, current) => {
            let specs = current.specs;
            if (specs.length === 0) return prev;
            specs.sort((a, b) => a.price.iSpecPromoPrice - b.price.iSpecPromoPrice);
            prev.push({ ...current, specs,})
            return prev;
         }, []);
      }

      onMounted(async() => {
         isLoading.value = true;
         let allResponse = await Promise.all([ scenesApi.banner(), productApi.product_recommend() ]);
         let [ bannerInfo, recommendInfo ] = allResponse;
         setBanner(bannerInfo);
         recommendList.data = processProduct(recommendInfo, 3);

         isLoading.value = false;
      });

      return { bannerList, recommendList, isLoading }
   }
};
</script>

<style src="./scss/home.scss" lang="scss" scoped></style>
