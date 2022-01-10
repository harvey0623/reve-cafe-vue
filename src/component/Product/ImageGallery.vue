<template>
   <div class="product-gallery">
      <div class="swiper main-swiper">
         <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(imgUrl,index) in slideList" :key="index">
               <img :src="imgUrl">
            </div>
         </div>
      </div>
      <div class="swiper sub-swiper">
         <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(imgUrl,index) in slideList" :key="index">
               <div class="imgBox">
                  <img :src="imgUrl">
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { onMounted, toRefs } from "@vue/composition-api"
import Swiper from 'swiper/swiper-bundle.min.js'
export default {
   props: {
      bannerList: { type: Array, default: () => [] }
   },
   setup(props, { root }) {
      let { bannerList:slideList } = toRefs(props);

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
      });

      return { slideList };
   },
};
</script>

<style lang="scss" scoped>
%imgStyle {
   position: absolute;
   left: 0;
   top: 0;
   @include size(100%);
   object-fit: cover;
}

.main-swiper {
   margin-bottom: 8px;
   .swiper-slide {
      position: relative;
      padding-top: 75%;
      img {
         @extend %imgStyle;
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
            @extend %imgStyle;
         }
      }
   }
}
</style>
