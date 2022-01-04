<template src="./html/step2.html"></template>

<script>
import { ref, reactive, onMounted } from '@vue/composition-api'
import { storageObj } from '@/plugins/storage/index.js'
import { thirdPartyAuthApi } from '@/api/index.js'
export default {
   name: 'register-step2',
   metaInfo () {
      return {
        title: '忘記密碼(簡訊驗證)',
      }
   },
   setup(props, { root }) {
      let user = reactive({ mobile: '', tempToken: '', code: '999999' });
      let tipInfo = reactive({ status: 0, message: '', type: '' });
      let isLoading = ref(false);
      let form = ref(null);
      let checkModal = ref(null);
      
      let checkAndSetStep1Data = () => {
         let step1Data = storageObj.getSessionItem('forgot');
         if (step1Data === null) {
            tipInfo.message = '請重新填寫表單';
            tipInfo.type = 'check';
            checkModal.value.openModal();
            return;
         }
         user.mobile = step1Data.user.mobile;
         user.tempToken = step1Data.tempToken;
      }

      let resend_verify = async() => {
         isLoading.value = true;
         let resendResponse = await thirdPartyAuthApi.resend_forget_verify({ 
            temp_access_token: user.tempToken
         });
         tipInfo.status = resendResponse.status;
         tipInfo.message = resendResponse.message;
         tipInfo.type = 'resend';
         checkModal.value.openModal();
         isLoading.value = false;
      }

      let submitHandler = async() => {
         let isValid = await form.value.validate();
         if (!isValid) return;
         isLoading.value = true;
         let verifyResponse = await thirdPartyAuthApi.forgot_password_verify({
            temp_access_token: 'abc123-anc555',
            verify_code: user.code
         });
         console.log(verifyResponse);
         tipInfo.status = verifyResponse.status;
         tipInfo.message = verifyResponse.message;
         tipInfo.type = 'verify';
         checkModal.value.openModal();
         isLoading.value = false;
      }

      let confirmHandler = () => {
         if (tipInfo.type === 'check') return root.$router.push('/forgot/step1');
         if (tipInfo.type === 'resend') {
            let { status } = tipInfo;
            if (status === 0 || status === 2) {
               storageObj.removeSessionItem('forgot');
               root.$router.push('/forgot/step1');
            } else {
               checkModal.value.closeModal();
            }
            return;
         }
         if (tipInfo.type === 'verify') {
            let { status } = tipInfo;
            if (status === 0) {
               checkModal.value.closeModal();
            } else if (status === 1) {
               root.$router.push('/forgot/step3');
            } else if (status === 2) {
               storageObj.removeSessionItem('forgot');
               root.$router.push('/forgot/step1');
            }
            return;
         }
      }

      onMounted(() => {
         checkAndSetStep1Data();
      });

      return { user, checkModal, tipInfo, confirmHandler, isLoading, submitHandler, form, resend_verify };
   }
}
</script>

<style lang="scss" scoped>
.top { 
   >.text-form {
      font-weight: bold;
   }
}
.line {
   margin: 30px 0;
   border-top: 1px solid map-get($borderColor, outer);
}
.bottom {
   >h3 {
      margin-bottom: 50px;
      font-size: 25px;
   }
   .form-row {
      justify-content: center;
      >.form-title {
         flex: 0 0 100px;
         font-weight: bold;
      }
      >.form-content {
         flex: initial;
         >.form-control {
            display: inline-block;
            width: 250px;
            margin-right: 10px;
            margin-left: 5px;
         }
         >.btnBox {
            display: inline-block;
            >button {
               width: 110px;
               color: #fff;
            }
         }
      }
   }
}
.submitBox {
   >button {
      width: 150px;
   }
}
</style>