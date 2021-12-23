<template>
   <div class="home">
      home
   </div>
</template>

<script>
export default {
   name: 'Home',
   components: {
      
   },
   metaInfo () {
      return {
        title: '首頁',
      }
   },
   mounted() {
      console.log(this.$route)
   }
};
</script>

