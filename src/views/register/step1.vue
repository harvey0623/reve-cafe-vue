<template src="./html/step1.html"></template>

<script>
import { ref, reactive, computed, onMounted } from '@vue/composition-api'
import { createFormList, createZipcode } from '@/composition-api/index.js'
import { thirdPartyAuthApi } from '@/api/index.js'
import { storageObj, wm_aes } from '@/plugins/index.js'
import TermTrigger from '@/component/Term/TermTrigger.vue'
import _ from 'lodash'
export default {
   name: 'register-step1',
   components: { TermTrigger },
   metaInfo () {
      return {
        title: '加入會員',
      }
   },
   setup(props, { root }) {
      let { genderList, questionList } = createFormList();
      let { addressInfo, cityList, districtList } = createZipcode();
      let user = reactive({ mobile: '', password: '', confirm_password: '', name: '', gender: '',security_question: '', security_answer: '', isAgree: false, email: '', birthday: '', address: ''
      });
      let responseInfo = reactive({ status: 0, message: '', type: '' });
      let termContent = ref('');
      let form = ref(null);
      let checkModal = ref(null);
      let agreeModal = ref(null);
      let termModal = ref(null);
      let isLoading = ref(false);
      let termInfo = computed(() => root.$store.getters.termInfo);
      let totalTerms = computed(() => _.size(termInfo.value));

      let termTrigger = (termId) => {
         termContent.value = root.$store.getters.getTermContent(termId);
         termModal.value.openModal();
      }

      let register_check = () => {
         return thirdPartyAuthApi.register_check({
            register_check: {
               mobile: wm_aes(user.mobile),
               password: wm_aes(user.password),
               confirm_password: wm_aes(user.confirm_password),
               name: user.name,
               gender: user.gender,
               security_question: user.security_question,
               security_answer: user.security_answer
            }
         })
      }

      let register = () => {
         let copyUser = _.cloneDeep(user);
         delete copyUser.isAgree;
         copyUser.birthday = copyUser.birthday.replace(/-/g, '/');
         return thirdPartyAuthApi.register({
            register: {
               ...copyUser,
               mobile: wm_aes(copyUser.mobile),
               password: wm_aes(copyUser.password),
               confirm_password: wm_aes(copyUser.confirm_password),
               city: addressInfo.city,
               district: addressInfo.district
            }
         });
      }

      let setResponseInfo = (payload, type)  => {
         responseInfo.status = payload.status;
         responseInfo.message = payload.message;
         responseInfo.type = type;
         checkModal.value.openModal();
         isLoading.value = false;   
      }

      let saveUserData = (tempToken) => {
         storageObj.setSessionItem('step1', { user, addressInfo, tempToken });
      }

      let setUserData = async() => {
         let payload = storageObj.getSessionItem('step1');
         if (payload === null) return;
         for (let key in payload.user) {
            user[key] = payload.user[key];
         }
         addressInfo.city = payload.addressInfo.city;
         await root.$nextTick();
         addressInfo.district = payload.addressInfo.district;
      }

      let submitHandler = async() => {
         let isValid = await form.value.validate();
         if (!user.isAgree) agreeModal.value.openModal();
         if (!isValid || !user.isAgree) return;
         isLoading.value = true;
         let checkResponse = await register_check();
         if (checkResponse.status === 0) {
            setResponseInfo(checkResponse, 'register_check');
            return;
         }
         let registerResponse = await register();
         setResponseInfo(registerResponse, 'register');
         if (registerResponse.status === 1) saveUserData(registerResponse.aaData.temp_access_token);
      }

      let confirmHandler = () => {
         if (responseInfo.status === 0) return checkModal.value.closeModal();
         if (responseInfo.type === 'register') root.$router.push('/register/step2');
      }

      onMounted(() => {
         setUserData();
      });

      return { genderList, questionList, user, addressInfo, cityList, districtList, submitHandler, form, isLoading, responseInfo, confirmHandler, checkModal, termInfo, totalTerms, termContent,agreeModal, termTrigger, termModal }
   }
}
</script>

<style lang="scss" scoped>
.outline-block {
   .form-row {
      &.checkbox-row {
         >.form-title {
            padding-top: 0;
         }
         >.term-content {
            display: flex;
            flex-wrap: wrap;
         }
      }
      >.form-title {
         flex: 0 0 200px;
      }
      >.form-content {
         flex: 0 0 300px;
      }
   }
}
</style>