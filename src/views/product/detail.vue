<template src="./html/detail.html"></template>

<script>
import { ref, reactive, computed, onMounted, watch } from '@vue/composition-api'
import { productApi, cartApi } from '@/api/index.js'
import ImageGallery from '@/component/Product/ImageGallery.vue'
import SpecItem from '@/component/SpecItem/index.vue'
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
      let addInfo = reactive({ status: 0, message: '', isRedirect: '' });
      let cartModal = ref(null);

      let pickedSpecHasStock = computed(() => pickedSpec.stockTotal > 0);

      let setProductIntro = (payload) => {
         productIntro.category = payload.category ? payload.category.vCategoryName : '';
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

      let findSpecificSpec = () => {
         let routeSpecId = parseInt(root.$route.query.specId);
         let targetSpec = specList.data.find(spec => spec.iId === routeSpecId);
         if (targetSpec === undefined) return;
         pickedSpec.specId = targetSpec.iId;
         pickedSpec.stockTotal = targetSpec.iSpecStock;
         pickedSpec.buyCount = 1;
         pickedSpec.price = targetSpec.price.iSpecPromoPrice;
      }

      let addCart = async(isRedirect) => {
         isLoading.value = true;
         let addResponse = await cartApi.addCart({
            vProductCode: productCode.value,
            iSpecId: pickedSpec.specId,
            iCount: pickedSpec.buyCount,
         });
         addInfo.status = addResponse.status;
         addInfo.message = addResponse.message;
         addInfo.isRedirect = isRedirect;
         cartModal.value.openModal();
         if (addInfo.status === 1) root.$store.dispatch('cart/getAllCart');
         isLoading.value = false;
      }

      let confirmHandler = () => {
         let { status, isRedirect } = addInfo;
         if (status === 1 && isRedirect) {
            root.$router.push('/');
         } else {
            cartModal.value.closeModal();
         }
      }

      onMounted(async() => {
         isLoading.value = true;
         productCode.value = root.$route.params.productCode;
         await setProductDetail();
         findSpecificSpec();
         isFirstLoading.value = false;
         isLoading.value = false;
      });

      watch(() => root.$route, async(val) => {
         isLoading.value = true;
         productCode.value = val.params.productCode;
         await setProductDetail();
         findSpecificSpec();
         isLoading.value = false;
      });

      return { isLoading, bannerList, showGallery, productIntro, pickedSpec, specList, changeSpec, pickedSpecHasStock, isFirstLoading, addInfo, addCart, cartModal, confirmHandler }
   }
}
</script>

<style src="./scss/detail.scss" lang="scss" scoped></style>