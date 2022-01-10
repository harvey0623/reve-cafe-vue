<template>
   <div class="product-gallery">
      <div class="swiper main-swiper">
         <div class="swiper-wrapper">
            <div class="swiper-slide">
               <img src="https://swiperjs.com/demos/images/nature-1.jpg">
            </div>
            <div class="swiper-slide">
               <img src="https://swiperjs.com/demos/images/nature-2.jpg">
            </div>
            <div class="swiper-slide">
               <img src="https://swiperjs.com/demos/images/nature-3.jpg">
            </div>
            <div class="swiper-slide">
               <img src="https://swiperjs.com/demos/images/nature-4.jpg">
            </div>
            <div class="swiper-slide">
               <img src="https://swiperjs.com/demos/images/nature-5.jpg">
            </div>
         </div>
      </div>
      <div class="swiper sub-swiper">
         <div class="swiper-wrapper">
            <div class="swiper-slide">
               <div class="imgBox">
                  <img src="https://swiperjs.com/demos/images/nature-1.jpg">
               </div>
            </div>
            <div class="swiper-slide">
               <div class="imgBox">
                  <img src="https://swiperjs.com/demos/images/nature-2.jpg">
               </div>
            </div>
            <div class="swiper-slide">
               <div class="imgBox">
                  <img src="https://swiperjs.com/demos/images/nature-3.jpg">
               </div>
            </div>
            <div class="swiper-slide">
               <div class="imgBox">
                  <img src="https://swiperjs.com/demos/images/nature-4.jpg">
               </div>
            </div>
            <div class="swiper-slide">
               <div class="imgBox">
                  <img src="https://swiperjs.com/demos/images/nature-5.jpg">
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { ref, reactive, onMounted } from "@vue/composition-api"
import Swiper from 'swiper/swiper-bundle.min.js'
export default {
   props: {},
   setup(props, { root }) {

      let initSwiper = () => {
         let subSwiper = new Swiper('.sub-swiper', {
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
            spaceBetween: 3,
         });
         new Swiper('.main-swiper', {
            thumbs: {
               swiper: subSwiper
            }
         });
      }

      onMounted(() => {
         initSwiper()
      })

      return {};
   },
};
</script>

<style lang="scss">
.main-swiper {
   margin-bottom: 5px;
   .swiper-slide {
      position: relative;
      padding-top: 75%;
      img {
         position: absolute;
         left: 0;
         top: 0;
         @include size(100%);
      }
   }
}
.sub-swiper {
   .swiper-slide {
      border: 3px solid transparent;
      &.swiper-slide-thumb-active{
         border-color: map-get($borderColor, primary);
      }
      .imgBox {
         position: relative;
         padding-top: 75%;
         cursor: pointer;
         img {
            position: absolute;
            left: 0;
            top: 0;
            @include size(100%);
         }
      }
   }
}
</style>
