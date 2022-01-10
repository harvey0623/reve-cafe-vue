<template>
   <h3 class="page-name text-primary" v-show="isShow">{{ pageName }}</h3>
</template>

<script>
import { computed } from '@vue/composition-api'
export default {
   setup(props, { root }) {
      let isShow = computed(() => root.$route.meta.pageName.show);
      let pageName = computed(() => root.$route.meta.pageName.title);

      return { isShow, pageName }
   }
}
</script>

<style lang="scss" scoped>
   .page-name {
      margin-top: 20px;
      margin-bottom: 40px;
      text-align: center;
      font-size: 30px;
      font-weight: normal;
   }
</style>