<template>
   <footer>
      <div class="footer-top">
         <div class="my-container">
            <div class="footer-logo-box">
               <img :src="require('@/assets/img/footer-logo.png')" alt="">
            </div>
            <div class="footer-info">
               <ul class="infoList">
                  <li class="info-item">
                     <p class="name">關於黑浮</p>
                     <div class="link-block">
                        <router-link to="/faq">Q&A</router-link>
                        <router-link to="/brand">品牌介紹</router-link>
                     </div>
                  </li>
                  <li class="info-item">
                     <p class="name">相關政策</p>
                     <div class="link-block">
                        <router-link v-for="term in termList" :key="term.id" :to="{name: 'term', query:{termId: term.id }}">{{ term.title }}</router-link>
                     </div>
                  </li>
               </ul>
            </div>
         </div>
      </div>
      <div class="footer-bottom">
         <div class="my-container">
            <p class="copyright">Copyright © RÊVE INTERNATIONAL RESTAURANT MANAGEMENT CO., LTD.</p>   
         </div>
      </div>
   </footer>
</template>

<script>
import { computed, onMounted } from '@vue/composition-api'
export default {
   setup(props, { root }) {
      let termList = computed(() => root.$store.getters.termInfo);

      onMounted(() => {
         root.$store.dispatch('getTerm');
      });

      return { termList }
   }
}
</script>

<style lang="scss" scoped>
.footer-top {
   position: relative;
   background-image: url('~@/assets/img/footer-bg.jpg');
   background-size: cover;
   background-position: center center;
   >.my-container {
      position: relative;
      @extend %bwtFlex;
      padding-top: 55px;
      padding-bottom: 55px;
      z-index: 2;
      >.footer-logo-box {
         flex: 0 0 250px;
         >img {
            display: block;
            @include size(100%, auto);
         }
      }
   }
   &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      @include size(100%);
      background-color: rgba(#000, 0.7);
      z-index: 1;
   }
}

.infoList {
   display: flex;
   align-items: flex-start;
   >.info-item {
      @include elGutter(margin-right, 50px);
      >.name {
         color: #fff;
         font-size: 20px;
         &:after {
            content: '';
            display: block;
            @include size(50px, 2px);
            margin-top: 15px;
            background-color: map-get($elBgColor, primary);
         }
      }
      >.link-block {
         margin-top: 15px;
         >a {
            display: block;
            @include elGutter(margin-bottom, 15px);
            color: #fff;
         }
      }
   }
}

.footer-bottom {
   background-color: #000;
   color: #fff;
   >.my-container {
      padding-top: 10px;
      padding-bottom: 10px;
      >.copyright {
         text-align: center;
         font-size: 12px;
      }
   }
}
</style>