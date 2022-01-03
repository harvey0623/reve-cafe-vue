<template src="./html/step1.html"></template>

<script>
import { ref, reactive } from '@vue/composition-api'
import { createFormList, createZipcode } from '@/composition-api/index.js';
import { wm_aes } from '@/plugins/crypto/index.js';
import { thirdPartyAuthApi } from '@/api/index.js';
import { storageObj } from '@/plugins/storage/index.js';
export default {
   name: 'register-step1',
   metaInfo () {
      return {
        title: '加入會員',
      }
   },
   setup(props, { root }) {
      let { genderList, questionList } = createFormList();
      let { addressInfo, cityList, districtList } = createZipcode();
      let user = reactive({ mobile: '0986104660', password: 'abc123', confirm_password: 'abc123', name: 'aaa', gender: 'M',security_question: 'sq01', security_answer: 'aaa', isAgree: false, email: '', birthday: '2000-06-06', address: ''
      });
      let form = ref(null);
      let isLoading = ref(false);
      let checkModal = ref(null);
      let responseInfo = reactive({ status: 0, message: '', type: '' });

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

      let submitHandler = async() => {
         let isValid = await form.value.validate();
         if (!isValid) return;
         isLoading.value = true;
         let checkResponse = await register_check();
         if (checkResponse.status === 0) {
            setResponseInfo(checkResponse, 'register_check');
            return;
         }
         let registerResponse = await register();
         setResponseInfo(registerResponse, 'register');
         if (registerResponse.status === 1) {
            storageObj.setSessionItem('temp_access_token', { token: registerResponse.aaData.temp_access_token });
         }
      }

      let confirmHandler = () => {
         if (responseInfo.status === 0) return checkModal.value.closeModal();
         if (responseInfo.type === 'register') root.$router.push('/register_step2');
      }

      return { genderList, questionList, user, addressInfo, cityList, districtList, submitHandler, form, isLoading, responseInfo, confirmHandler, checkModal }
   }
}
</script>

<style lang="scss" scoped>
.outline-block {
   .form-row {
      &.divide-line {
         border-top: 1px solid map-get($borderColor, outer);
      }
      >.form-title {
         flex: 0 0 200px;
         padding-right: 15px;
         font-weight: bold;
         text-align: right;
      }
      >.form-content {
         flex: 0 0 300px;
      }
   }
   .btnBox {
      >button {
         width: 200px;
      }
   }
}
</style>