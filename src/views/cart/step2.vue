<template src="./html/step2.html"></template>

<script>
import { ref, reactive, computed, onMounted, watch } from '@vue/composition-api'
import { createFormList, createCartInfo } from '@/composition-api/index.js'
import { orderApi } from '@/api/index.js'
import NormalDetailRow from '@/component/CartTableRow/normal-detail-row.vue'
import ActivityDetailRow from '@/component/CartTableRow/activity-detail-row.vue'
import MatchDetailRow from '@/component/CartTableRow/match-detail-row.vue'
export default {
   name: 'cart-step2',
   components: { NormalDetailRow, ActivityDetailRow, MatchDetailRow },
   setup(props, { root }) {
      let { genderList } = createFormList();
      let { invoiceMappingKey } = createCartInfo();
      let orderNumber = ref('');
      let tipMessage = ref('');
      let isLoading = ref(true);
      let tipModal = ref(null);
      let cartList = reactive({ data: [] });
      let orderConfig = reactive({ ship: '', pay: '', invoice: { id: '', list: [], value: '' }});
      let orderer = reactive({ vName: '', vGender: '', vContact: '', vEmail: '', vCity: '', vArea: '', vAddress: '', vZipCode: '',
      });
      let recipient = reactive({ vName: '', vGender: '', vContact: '', vEmail: '', vCity: '', vArea: '', vAddress: '', vZipCode: '', vRemarks: '' });

      let ordererGenderText = computed(() => {
         let obj = genderList.find(item => item.id === orderer.vGender);
         if (obj !== undefined) return obj.title;
         else return '';
      });

      let receipentGenderText = computed(() => {
         let obj = genderList.find(item => item.id === recipient.vGender);
         if (obj !== undefined) return obj.title;
         else return '';
      });

      let invoiceTitle = computed(() => {
         let obj = orderConfig.invoice.list.find(item => item.value === orderConfig.invoice.id);
         if (obj !== undefined) return obj.text;
         else return '';
      });

      let ordererAddress = computed(() => {
         let { vCity, vArea, vAddress, vZipCode } = orderer;
         return `${vZipCode}${vCity}${vArea}${vAddress}`;
      });

      let recipientAddress = computed(() => {
         let { vCity, vArea, vAddress, vZipCode } = orderer;
         return `${vZipCode}${vCity}${vArea}${vAddress}`;
      });

      let tipHandler = () => root.$router.replace('/');
      
      let processNormalProduct = (arr) => {
         return arr.reduce((prev, current) => {
            prev.push({ ...current, cartType: 'normal', componentName: 'NormalDetailRow' });
            return prev;
         }, []);
      }

      let processActivityProduct = (arr) => {
         return arr.reduce((prev, current) => {
            let componentName = current.vActivityCode === 'full_amount' ? 'ActivityDetailRow' : 'MatchDetailRow';
            prev.push({ ...current, cartType: 'activity', componentName });
            return prev;
         }, []);
      }

      let setOrderConfig = (payload) => {
         orderConfig.ship = payload.shipping.vShipmentType;
         orderConfig.pay = payload.info.vPayType;
         orderConfig.invoice.id = payload.info.iInvoiceType;
         orderConfig.invoice.value = payload.info[invoiceMappingKey[orderConfig.invoice.id]];
      }

      let setPersonInfo = (type, payload) => {
         let character = type === 'orderer' ? orderer : recipient;
         for (let key in character) {
            character[key] = payload[key];
         }
      }

      let getOrderDetail = async() => {
         let response = await orderApi.order_detail({ vOrderNum: orderNumber.value });
         console.log(response)
         if (response.status === 0) {
            tipMessage.value = response.message;
            tipModal.value.openModal();
            return;
         }
         setOrderConfig(response.aaData);
         setPersonInfo('orderer', response.aaData.addressee_1);
         setPersonInfo('recipient', response.aaData.addressee_2);
         let normalCart =  processNormalProduct(response.aaData.meta);
         let activityCart = processActivityProduct(response.aaData.activity_product_promotions_meta_bundle);
         cartList.data = normalCart.concat(activityCart);
      }

      onMounted(async() => {
         isLoading.value = true;
         orderNumber.value = root.$route.query.orderNumber;
         orderConfig.invoice.list = await orderApi.invoice().then(res => res.aaData);
         await getOrderDetail();
         isLoading.value = false;
      });

      watch(() => root.$route, async(val) => {
         isLoading.value = true;
         orderNumber.value = val.query.orderNumber;
         await getOrderDetail();
         isLoading.value = false;
      });

      return { cartList, isLoading, tipMessage, ordererGenderText, receipentGenderText, orderConfig, ordererAddress,recipientAddress, tipModal, orderer, recipient, invoiceTitle, tipHandler }
   }
}
</script>

<style lang="scss" src="./scss/step1.scss">

</style>