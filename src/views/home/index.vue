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
      <div class="section-block popular" v-show="hasRecommend">
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
      <div class="section-block" v-show="hasProduct">
         <div class="my-container">
            <h3 class="blobk-title text-primary">PRODUCT</h3>
            <div class="product-row">
               <MultipleSpecItem 
                  v-for="product in productList.data"
                  :key="product.iId"
                  :productInfo="product"
               ></MultipleSpecItem>
            </div>
         </div>
      </div>
      <Loading v-show="isLoading"></Loading>
   </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from '@vue/composition-api'
import { scenesApi, productApi } from '@/api/index.js'
import { createMultipleSpec } from '@/composition-api/index.js'
import Swiper from 'swiper/swiper-bundle.min.js'
import PopularItem from '@/component/Product/PopularItem.vue'
import MultipleSpecItem from '@/component/Product/MultipleSpecItem.vue'
export default {
   name: 'Home',
   components: { PopularItem, MultipleSpecItem },
   metaInfo () {
      return {
        title: '首頁',
      }
   },
   setup(props, { root }) {
      let { processProduct } = createMultipleSpec();
      let bannerList = reactive({ data: [] });
      let recommendList = reactive({ data: [] });
      let productList = reactive({ data: [] });
      let isLoading = ref(false);

      let hasRecommend = computed(() => recommendList.data.length > 0);
      let hasProduct = computed(() => productList.data.length > 0);

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

      onMounted(async() => {
         isLoading.value = true;
         let allResponse = await Promise.all([ 
            scenesApi.banner(), productApi.product_recommend(), productApi.product({})
         ]);
         let [ bannerInfo, recommendInfo, productInfo ] = allResponse;
         setBanner(bannerInfo);
         recommendList.data = processProduct(recommendInfo.aaData, 3);
         productList.data = processProduct(productInfo.aaData, 10);
         isLoading.value = false;
      });

      return { bannerList, recommendList, productList, isLoading, hasRecommend, hasProduct }
   }
};
</script>

<style lang="scss" scoped>
#banner-swiper {
   height: 550px;
   .swiper-slide {
      height: 550px;
      >img {
         @include size(100%);
         object-fit: cover;
      }
   }
}
.section-block {
   >.my-container {
      padding-top: 50px;
      padding-bottom: 50px;
   }
   &.popular {
      background-color: map-get($elBgColor, input);
   }
}
.blobk-title {
   margin-bottom: 30px;
   text-align: center;
   font-weight: normal;
   font-size: 30px;
}
.popular-row {
   display: flex;
   align-items: flex-start;
   justify-content: space-between;
}
</style>
