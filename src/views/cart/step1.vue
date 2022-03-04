<template src="./html/step1.html"></template>

<script>
import { ref, reactive ,computed, onMounted, watch } from '@vue/composition-api'
import { productApi, thirdPartyMemberApi, cartApi, activityCartApi, orderApi } from '@/api/index.js'
import { createActivityInfo, createFormList, createCartInfo } from '@/composition-api/index.js'
import TemperatureItem from '@/component/TemperatureItem/index.vue'
import NormalEditRow from '@/component/CartTableRow/normal-edit-row.vue'
import ActivityEditRow from '@/component/CartTableRow/activity-edit-row.vue'
import MatchEditRow from '@/component/CartTableRow/match-edit-row.vue'
import AddressField from '@/component/AddressField/index.vue'
import EmptyBlock from '@/component/EmptyBlock/index.vue'
export default {
   name: 'cart-step1',
   components: { TemperatureItem, NormalEditRow, ActivityEditRow, MatchEditRow, AddressField, EmptyBlock },
   setup(props, { root }) {
      let { genderList } = createFormList();
      let { invoiceMappingKey } = createCartInfo();
      let cartList = reactive({ data: [] });
      let temperatureList = reactive({ data: [] });
      let temperatureType = ref('');
      let isAllChecked = ref(true);
      let isLoading = ref(false);
      let syncOrderer = ref(false);
      let settleDollar = ref(0);
      let insertedPointIsError = ref(false);
      let pointInput = ref(null);
      let cartModal = ref(null);
      let checkModal = ref(null);
      let orderer = reactive({ vName: '', vGender: '', vContact: '', vEmail: '', vCity: '', vArea: '', vAddress: '', vZipCode: 0,
      });
      let recipient = reactive({ vName: '', vGender: '', vContact: '', vEmail: '', vCity: '', vArea: '', vAddress: '', vZipCode: 0, vRemarks: '' });
      let orderConfig = reactive({
         pay: { id: '', list: [] },
         invoice: { id: '', list: [], value: '', companyTitle: '' },
         ship: { id: 0, list: [] },
         outbound: []
      });
      let userPoint = reactive({ id: 0, total: 0, used: 0 });
      let createdResult = reactive({ status: 0, message: '' });
      let checkedBuildResult = reactive({ status: 0, message: '', orderNumber: '' });

      let hasCart = computed(() => cartList.data.length > 0 );

      let temperatureTab = computed(() => temperatureList.data.filter(item => item.count > 0));

      let filterCartList = computed(() => cartList.data.filter(item => item.temperatureCode === temperatureType.value));

      let filterCartCount = computed(() => filterCartList.value.length);

      let normalCartDollar = computed(() => {
         let arr = filterCartList.value.filter(item => item.cartType === 'normal' && item.isChecked);
         return arr.reduce((prev, current) => {
            prev += current.iCount * current.spec.price.iSpecPromoPrice;
            return prev;
         }, 0);
      });

      let activityCartDollar = computed(() => {
         let arr = filterCartList.value.filter(item => item.cartType === 'activity' && item.isChecked);
         return arr.reduce((prev, current) => {
            prev += current.iCount * current.iBundlePromoPrice;
            return prev;
         }, 0);
      });

      let filterCartSubTotal = computed(() => normalCartDollar.value + activityCartDollar.value);

      let canSubmit = computed(() => filterCartSubTotal.value > 0);

      let invoicePlaceholder = computed(() => {
         let mappingText = { 
            0: '', 
            1: '請輸入手機條碼', 
            2: '請輸入自然人憑證', 
            4: '請輸入電子信箱', 
            5: '請輸入統一編號' 
         };
         return mappingText[orderConfig.invoice.id] || '';
      });

      let showCompanyTitle = computed(() => orderConfig.invoice.id === 5);

      let shipList = computed(() => orderConfig.ship.list.filter(item => item.vTemperatureCode === temperatureType.value));

      let shipInfo = computed(() => { //運費資訊
         let obj = shipList.value.find(item => item.iId === orderConfig.ship.id);
         return obj !== undefined ? obj : null;
      });

      let freeShipmentAmount = computed(() => { //免運金額
         return shipInfo.value !== null ? shipInfo.value.iFreeShipment : -1;
      });

      let isReachedFreeShipCondition = computed(() => { //是否達成免條件
         if (freeShipmentAmount.value < 0) return false;
         let usedPoint = userPoint.used === '' ? 0 : userPoint.used;
         return filterCartSubTotal.value - usedPoint >= freeShipmentAmount.value;
      });

      let shipFee = computed(() => { //實際運費
         if (shipInfo.value === null) return 0;
         if (isReachedFreeShipCondition.value) return 0;
         let isOutbound = orderConfig.outbound.some(item => item.vTitle === recipient.district);
         let { iShipment, iShipmentOutbound } = shipInfo.value;
         return isOutbound ? iShipmentOutbound : iShipment;
      });

      let createUid = () => {
         let d = new Date().getTime()
         let d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
         return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16;
            if (d > 0) {
               r = (d + r) % 16 | 0;
               d = Math.floor(d / 16);
            } else {
               r = (d2 + r) % 16 | 0;
               d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
         });
      }

      let cammaToNumber = (text) => parseInt(text.replace(/,/g, ''))

      let checkNormalCart = async(lists) => {
         if (lists.length === 0) return [];
         let arr = [];
         for (let list of lists) {
            if (list.spec.iSpecStock <= 0) {
               await cartApi.removeCart(list.iId);
            } else {
               arr.push({
                  ...list,
                  uid: createUid(),
                  temperatureCode: list.product.temperature.vTemperatureCode,
                  isChecked: isAllChecked.value,
                  componentName: 'NormalEditRow',
                  cartType: 'normal',
                  routeName: 'product_detail'
               });
            }
         }
         return arr;
      }

      let checkActivityCart = async(lists) => {
         if (lists.length === 0) return [];
         let arr = [];
         let mappingObj = createActivityInfo();
         for (let list of lists) {
            let hasStock = list.cart.every(item => item.spec.iSpecStock > 0);
            if (!hasStock) {
               await activityCartApi.removeCart(list.iId);
            } else {
               let isFullAmountCode = list.vActivityCode === 'full_amount';
               let componentName = isFullAmountCode ? 'ActivityEditRow' : 'MatchEditRow';
               arr.push({
                  ...list,
                  uid: createUid(),
                  temperatureCode: list.temperature.vTemperatureCode,
                  isChecked: isAllChecked.value,
                  componentName,
                  cartType: 'activity',
                  routeName: mappingObj[list.vActivityCode][list.activity_product_promotions.iType].routeName
               });
            }
         }
         return arr;
      }

      let createTemperatureList = (temperatureArr, cartArr) => {
         return temperatureArr.reduce((prev, current) => {
            let filterArr = cartArr.filter(item => item.temperatureCode === current.vTemperatureCode);
            prev.push({ ...current, count: filterArr.length });
            return prev;
         }, []);
      }

      let getCartAndtemperature = async() => {
         let [normalCartInfo, activityCartInfo, temperatureInfo] = await Promise.all([
            cartApi.getCart(), activityCartApi.getCart(), productApi.product_temperature()
         ]);
         let [ normalList, activityList ] = await Promise.all([
            checkNormalCart(normalCartInfo.aaData), checkActivityCart(activityCartInfo.aaData)
         ]);
         let allCart = normalList.concat(activityList);
         temperatureList.data = createTemperatureList(temperatureInfo.aaData, allCart);
         cartList.data = normalList.concat(activityList);
         temperatureType.value = temperatureTab.value.length !== 0 ? temperatureTab.value[0].vTemperatureCode : '';
      }

      let setTab = (payload) => {
         temperatureType.value = payload.type;
         isAllChecked.value = filterCartList.value.every(item => item.isChecked);
      }

      let checkTabStatus = () => {
         let targetTab = temperatureList.data.find(item => item.vTemperatureCode === temperatureType.value);
         targetTab.count = filterCartCount.value;
         if (filterCartCount.value > 0) return;
         if (temperatureTab.value.length > 0) {
            setTab({ type: temperatureTab.value[0].vTemperatureCode });
         } else {
            temperatureType.value = '';
         }
      }

      let singleCheck = (payload) => {
         let obj = filterCartList.value.find(item => item.uid === payload.uid);
         obj.isChecked = payload.isChecked;
         isAllChecked.value = filterCartList.value.every(item => item.isChecked);
      }

      let changeAllChecked = () => {
         filterCartList.value.forEach(item => item.isChecked = isAllChecked.value);  
      }

      let changeCount = async(payload) => {
         let { vProductCode, iSpecId, iCount } = payload;
         let targetObj = filterCartList.value.find(item => {
            return item.vProductCode === vProductCode && item.iSpecId === iSpecId;
         });
         cartApi.addCart(payload);
         targetObj.iCount = iCount;
      }

      let removeCartItem = async(payload) => {
         isLoading.value = true;
         let { cartType, uid, iId } = payload;
         let mappingApi = { normal: cartApi, activity: activityCartApi };
         let response = await mappingApi[cartType].removeCart(iId);
         if (response.status === 0) return isLoading.value = false;
         let index = cartList.data.findIndex(item => item.uid ===  uid);
         cartList.data.splice(index, 1);
         root.$store.dispatch('cart/getAllCart');
         checkTabStatus();
         isLoading.value = false;
      }

      let setMemberProfile = async() => {
         let response = await thirdPartyMemberApi.getProfile();
         let profileData = response.aaData.member_profile;
         orderer.vName = profileData.name;
         orderer.vGender = profileData.gender;
         orderer.vContact = profileData.mobile;
         orderer.vEmail = profileData.email;
         orderer.vCity = profileData.city;
         orderer.vArea = profileData.district;
         orderer.vAddress = profileData.address;
      }

      let syncHandler = async() => {
         if (!syncOrderer.value) return;
         for (let key in orderer) {
            recipient[key] = orderer[key];
         }
         await root.$nextTick();
         recipient.vArea = orderer.vArea;
      }

      let getConfigData = async() => {
         let [payInfo, invoiceInfo, shipInfo, outBoundInfo, memberSummary] = await Promise.all([ 
            orderApi.pay(), orderApi.invoice(), orderApi.ship(), orderApi.outbound(),
            thirdPartyMemberApi.summary()
         ]);
         setPayInfo(payInfo);
         setInvoceInfo(invoiceInfo);
         orderConfig.ship.list = shipInfo.aaData;
         orderConfig.outbound = outBoundInfo.aaData;
         let pointInfo = memberSummary.aaData.point_summary.current_point[0]; 
         userPoint.id = pointInfo.point_id;
         userPoint.total = cammaToNumber(pointInfo.amount);
      }

      let setPayInfo = (payload) => {
         orderConfig.pay.list = payload.aaData;
         orderConfig.pay.id = payload.aaData[0].value;
      }

      let setInvoceInfo = (payload) => {
         orderConfig.invoice.list = payload.aaData;
         orderConfig.invoice.id = payload.aaData[0].value;
      }

      let checkPointKeydown = (evt) => {
         let keyCode = evt.keyCode;
         if ([46, 8, 9, 27, 13, 190].indexOf(keyCode) !== -1 ||
            (evt.keyCode === 65 && evt.ctrlKey === true) ||
            (evt.keyCode >= 35 && evt.keyCode <= 39)) {
            return;
         }
         if ((evt.shiftKey || (keyCode < 48 || keyCode > 57)) && (keyCode < 96 || keyCode > 105)) {
            evt.preventDefault();
            return;
         }
      }

      let checkInsertedPoint = async() => {
         let { total:totalPoint, used: usedPoint } = userPoint;
         if (usedPoint === '') {
            insertedPointIsError.value = false;
            userPoint.used = 0;
         } else if (usedPoint > totalPoint || usedPoint > filterCartSubTotal.value) {
            insertedPointIsError.value = true;
            focusPointInput();
         } else {
            insertedPointIsError.value = false;
         }
         calculateSettledDollar();
      }

      let focusPointInput = () => {
         let el = pointInput.value;
         el.value = '';
         userPoint.used = 0;
         el.focus();
      }

      let calculateSettledDollar = () => {
         settleDollar.value = filterCartSubTotal.value + shipFee.value - userPoint.used;
      }

      let getSelectedCartItem = (cartType) => {
         return filterCartList.value.filter(item => item.cartType === cartType && item.isChecked).map(item => item.iId);
      }

      let checkOrderIsBuild = async(orderNumber) => { //確認訂單是否已處理完成(0:失敗,1:完成,2:處理中)
         let { status, message } = await orderApi.order_detail(orderNumber);
         checkedBuildResult.status = status;
         checkedBuildResult.message = message;
         checkedBuildResult.orderNumber = orderNumber;
         if (status === 0 || status === 1) {
            root.$store.dispatch('cart/getAllCart');
            checkModal.value.openModal();
            isLoading.value = false;
         } else if (status === 2) {
            setTimeout(() => {
               checkOrderIsBuild(orderNumber);
            }, 3000);
         }
      }

      let checkBuildHandler = () => {
         if (checkedBuildResult.status === 1) {
            root.$router.push({ name: 'cart-step2', query: { orderNumber: checkedBuildResult.orderNumber }});
         } else {
            checkModal.value.closeModal();
         }
      }

      let submitHandler = async() => {
         if (!canSubmit.value) return;
         if (insertedPointIsError.value) return;
         isLoading.value = true;
         let order_info = {
            iPayId: orderConfig.pay.id,
            iInvoiceType: orderConfig.invoice.id,
         };
         if (orderConfig.invoice.id !== 0) {
            order_info[invoiceMappingKey[orderConfig.invoice.id]] = orderConfig.invoice.value;
         }
         if (orderConfig.invoice.id === 5) order_info.vInvoiceCompany = orderConfig.invoice.companyTitle;
         let response = await orderApi.createOrder({
            cart_ids: getSelectedCartItem('normal'),
            activity_product_promotions_cart_bundle_ids: getSelectedCartItem('activity'),
            product_purchase: [],
            iShipmentId: orderConfig.ship.id,
            order_info,
            addressee_1: { ...orderer, vZipCode: orderer.vZipCode.toString() },
            addressee_2: { ...recipient, vZipCode: recipient.vZipCode.toString() },
            point_info: { point_id: userPoint.id, count: userPoint.used },
            cash_card: [{ service: 'wish_mmrm_dudooeat', count: 0}]
         });
         createdResult.status = response.status;
         createdResult.message = response.message;
         if (response.status === 1) {
            checkOrderIsBuild(response.vOrderNum);
         } else {
            cartModal.value.openModal();
            isLoading.value = false;
         }
      }

      onMounted(async() => {
         isLoading.value = true;
         await getConfigData();
         await setMemberProfile(); 
         await getCartAndtemperature();
         isLoading.value = false;
      });

      watch(() => orderer, () => {
         syncHandler();
      }, { deep: true });

      watch(() => orderConfig.invoice.id, () => {
         orderConfig.invoice.value = '';
         orderConfig.invoice.companyTitle = '';
      });

      watch(() => shipList.value, (val) => {
         orderConfig.ship.id = val[0] !== undefined ? val[0].iId : '';
      });

      watch(filterCartSubTotal, () => {
         userPoint.used = 0;
         calculateSettledDollar();
      });

      watch(shipFee, () => {
         calculateSettledDollar();
      });

      return { genderList, isLoading, isAllChecked, orderer, recipient, syncOrderer, orderConfig, temperatureType, pointInput, cartModal, checkModal, checkBuildHandler, insertedPointIsError, settleDollar, createdResult, checkedBuildResult, invoicePlaceholder, showCompanyTitle, hasCart, temperatureTab, filterCartList, filterCartCount, filterCartSubTotal, canSubmit, shipList, freeShipmentAmount, shipFee, userPoint, changeAllChecked, setTab, changeCount, singleCheck, removeCartItem, syncHandler, checkPointKeydown, checkInsertedPoint, submitHandler }
   }
}
</script>

<style lang="scss" src="./scss/step1.scss" scoped></style>