<template>
   <section class="my-section">
      <div class="my-container">
         <PageName></PageName>
         <slot></slot>
      </div>
   </section>
</template>

<script>
import PageName from '@/component/PageName/index.vue'
export default {
   name: 'page-layout',
   components: { PageName }
}
</script>

<style>

</style>