<template>
   <div class="member-menu">
      <router-link v-for="(item,index) in memberList" :key="index" :to="item.path" :class="{active: item.routeName === currentRouteName}">
         <p class="title">{{ item.title }}</p>
         <p class="text-input">{{ item.summary }}</p>
      </router-link>
      <a href="javascript:;" @click="logout">
         <p class="title">登出</p>
         <p class="text-input">Logout</p>
      </a>
   </div>
</template>

<script>
import { reactive, computed } from '@vue/composition-api'
export default {
   setup(props, { root, emit }) {
      let memberList = reactive([
         { title: '會員資料', summary: 'Member Profile', routeName: 'profile', path: '/member/profile' },
         { title: '訂單管理', summary: 'Order Management', routeName: 'order', path: '/member/order' },
         // { title: '點數紀錄', summary: 'Point History', routeName: 'point', path: '/member/point' },
      ]);

      let currentRouteName = computed(() => root.$route.name);

      let logout = () => emit('logout');

      return { memberList, currentRouteName, logout }
   }
}
</script>

<style lang="scss" sopced>
.member-menu {
   >a {
      position: relative;
      display: block;
      padding-bottom: 5PX;
      @include elGutter(margin-bottom, 25px);
      &:after {
         content: '';
         position: absolute;
         left: 0;
         bottom: 0;
         @include size(0, 2px);
         background-color: map-get($elBgColor, primary);
         transition: width 0.25s;
      }
      &:hover, 
      &.active {
         &:after {
            width: 100%;
         }
      }
      >.title {
         font-size: 20px;
         margin-bottom: 3px;
      }
      >.text-input {
         font-size: 15px;
      }
   }
}
</style>