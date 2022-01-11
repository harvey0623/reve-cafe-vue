<template src="./html/detail.html"></template>

<script>
import { ref, reactive, computed, onMounted, watch } from '@vue/composition-api'
import { productApi } from '@/api/index.js'
import ImageGallery from '@/component/Product/ImageGallery.vue'
import SpecItem from '@/component/SpecItem/index.vue';
export default {
   name: 'product-detail',
   components: { ImageGallery, SpecItem },
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
      let pickedSpec = reactive({ specId: 0, stockTotal: 0, buyCount: 0, price: 0 });
      let specList = reactive({ data: [] });
      let isFirstLoading = ref(true);

      let pickedSpecHasStock = computed(() => pickedSpec.stockTotal > 0);

      let setProductIntro = (payload) => {
         productIntro.category = payload.category.vCategoryName;
         productIntro.num = payload.vProductNum;
         productIntro.name = payload.vProductName;
         productIntro.summary = payload.vProductSummary;
         productIntro.temperature = payload.temperature.vTemperatureTitle;
         productIntro.editContent = payload.vProductDetail;
      }

      let createSpecList = (payload) => {
         let { specs, stocks } = payload;
         if (specs.length === 0 || stocks.length === 0) return [];
         return specs.reduce((prev, current) => {
            let targetStock = stocks.find(stock => stock.iProductSpecId === current.iId);
            prev.push({ ...current, stockInfo: targetStock });
            return prev;
         }, []);
      }

      let setDefaultSpecValue = () => {
         let targetSpec = specList.data.find(spec => spec.stockInfo.iStockCount > 0);
         let hasFirstSpec = targetSpec !== undefined;
         pickedSpec.specId = hasFirstSpec ? targetSpec.iId : 0;
         pickedSpec.stockTotal = hasFirstSpec ? targetSpec.stockInfo.iStockCount : 0;
         pickedSpec.buyCount = hasFirstSpec ? 1 : 0;
         pickedSpec.price = hasFirstSpec ? targetSpec.price.iSpecPromoPrice : specList.data[0].price.iSpecPromoPrice;
      }

      let changeSpec = (payload) => {
         pickedSpec.buyCount = 1;
         for (let key in payload) {
            pickedSpec[key] = payload[key];
         }
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
         specList.data = createSpecList(detailResponse.aaData);
         setDefaultSpecValue();
         showGallery.value = true;
      }

      onMounted(async() => {
         isLoading.value = true;
         productCode.value = root.$route.params.productCode;
         await setProductDetail();
         isFirstLoading.value = false;
         isLoading.value = false;
      });

      watch(() => root.$route, async(val) => {
         isLoading.value = true;
         productCode.value = val.params.productCode;
         await setProductDetail();
         isLoading.value = false;
      });

      return { isLoading, bannerList, showGallery, productIntro, pickedSpec, specList, changeSpec, pickedSpecHasStock, isFirstLoading }
   }
}
</script>

<style src="./scss/detail.scss" lang="scss"></style>