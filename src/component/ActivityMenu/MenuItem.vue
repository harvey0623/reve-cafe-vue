<template>
   <router-link :to="menuInfo.urlParams" class="menu-item" :class="{active:isActive}">
      <p class="title">{{ menuInfo.vTitle }}</p>
      <p class="text-input">{{ menuInfo.vSummary }}</p>
   </router-link>
</template>

<script>
import { computed, toRefs } from '@vue/composition-api'
export default {
   props: {
      menuInfo: { type: Object, required: true }
   },
   setup(props, { root }) {
      let $store = root.$store;

      let isActive = computed(() => {
         let { id, type } = $store.state.activity.activityInfo;
         let sameId = props.menuInfo.iId === id;
         let sameType = props.menuInfo.code === type;
         return sameId && sameType;
      });

      return { ...toRefs(props.menuInfo), isActive }
   }
}
</script>

<style lang="scss" scoped>
.menu-item {
   display: block;
   @include elGutter(margin-bottom, 20px);
   padding-bottom: 5px;
   position: relative;
   &.active,
   &:hover {
      &:after {
         width: 100%;
      }
   }
   &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      @include size(0%, 2px);
      background-color: map-get($elBgColor, primary);
      transition: width 0.2s;
   }
   >.title {
      margin-bottom: 5px;
      font-size: 20px;
   }
   >.input-text {
      font-size: 14px;
   }
}
</style>