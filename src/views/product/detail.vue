<template src="./html/detail.html"></template>

<script>
import { ref, reactive, computed, onMounted, watch } from '@vue/composition-api'
import ImageGallery from '@/component/Product/ImageGallery.vue'
import { productApi } from '@/api/index.js'
export default {
   name: 'product-detail',
   components: { ImageGallery },
   metaInfo () {
      return {
        title: '商品詳情',
      }
   },
   setup(props, { root }) {
      let productCode = ref('');
      let isLoading = ref(false);
      let bannerList = reactive({ data: [] });
      let showGallery = ref(false);
      let productIntro = reactive({ category: '',  num: '', name: '', summary: '', temperature: '', editContent: '' });

      let setProductIntro = (payload) => {
         console.log(payload);
         productIntro.category = payload.category.vCategoryName;
         productIntro.num = payload.vProductNum;
         productIntro.name = payload.vProductName;
         productIntro.summary = payload.vProductSummary;
         productIntro.temperature = payload.temperature.vTemperatureTitle;
         productIntro.editContent = payload.vProductDetail;
      }
      
      let setProductDetail = async() => {
         let detailResponse = await productApi.product_detail(productCode.value);
         if (detailResponse.status === 0 ) {
            console.log(detailResponse.message);
            return;
         }
         showGallery.value = false;
         bannerList.data = detailResponse.aaData.info.vImages;
         setProductIntro(detailResponse.aaData);

         showGallery.value = true;
      }

      onMounted(async() => {
         isLoading.value = true;
         productCode.value = root.$route.params.productCode;
         await setProductDetail();
         isLoading.value = false;
      });

      watch(() => root.$route, async(val) => {
         isLoading.value = true;
         productCode.value = val.params.productCode;
         await setProductDetail();
         isLoading.value = false;
      });

      return { isLoading, bannerList, showGallery, productIntro }
   }
}
// 9175cf640f439ddd94d3e295ca25ea49
// 58a2aea6b1314a3d5f989c8ca1ff894a
</script>

<style src="./scss/detail.scss" lang="scss"></style>