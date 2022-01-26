<template>
   <div class="term-block">
      <h3 class="term-title text-primary">{{ termTitle }}</h3>
      <div class="outline-block" v-html="termContent" v-show="termContent !== ''"></div>
   </div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
export default {
   metaInfo () {
      return {
         title: this.termTitle,
      }
   },
   setup(props, { root }) {
      let termId = ref('');

      let termTitle = computed(() => {
         let termInfo = root.$store.getters.termInfo;
         return termInfo[termId.value] !== undefined ? termInfo[termId.value].title : '';
      });

      let termContent = computed(() => root.$store.getters.getTermContent(termId.value));

      termId.value = root.$route.query.termId;

      watch(() => root.$route, (val) => {
         termId.value = val.query.termId;
      });
      
      return { termTitle, termContent }
   }
}
</script>

<style lang="scss" scoped>
.term-title {
   margin-top: 20px;
   margin-bottom: 40px;
   text-align: center;
   font-size: 30px;
   font-weight: normal;
}
</style>