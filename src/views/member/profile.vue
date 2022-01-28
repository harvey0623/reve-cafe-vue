<template src="./html/profile.html"></template>

<script>
import _ from 'lodash'
import { ref, reactive, onMounted } from '@vue/composition-api'
import { thirdPartyMemberApi } from '@/api/index.js'
import { createFormList, createZipcode } from '@/composition-api/index.js'
export default {
   name: 'profile',
   metaInfo () {
      return {
        title: '會員資料',
      }
   },
   setup(props, { root, emit }) {
      let { genderList, questionList } = createFormList();
      let { addressInfo, cityList, districtList } = createZipcode();
      let pointLevelInfo = reactive({ levelTitle: '', pointAmount: '' });
      let profileInfo = reactive({ mobile: '', name: '', gender: '', email: '', birthday: '', address: '', security_question: '', security_answer: '' });
      let form = ref(null);
      let updateModal = ref(null);
      let updateInfo = reactive({ message: '' });
      
      let setPointAndLevel = async(payload) => {
         let { level_summary, point_summary } = payload;
         let levelId = level_summary.current_level.level_id;
         let levelResponse = await thirdPartyMemberApi.level({ level_id: [levelId] });
         pointLevelInfo.levelTitle = levelResponse.aaData.level_information[0].title;
         pointLevelInfo.pointAmount = point_summary.current_point[0].amount;
      }

      let setProfileAndAddress = async(payload) => {
         for (let key in profileInfo) {
            if (key === 'birthday') payload[key] = payload[key].replace(/\//g, '-');
            profileInfo[key] = payload[key];
         }
         addressInfo.city = payload.city;
         await root.$nextTick();
         addressInfo.district = payload.district;
      }

      let submitHandler = async() => {
         let isValid = await form.value.validate();
         if (!isValid) return;
         emit('loading', true);
         let copyPayload = _.cloneDeep(profileInfo);
         delete copyPayload.mobile;
         delete copyPayload.birthday;
         let response = await thirdPartyMemberApi.updateProfile({
            member_profile: { ...copyPayload, city: addressInfo.city, district: addressInfo.district }
         });
         updateInfo.message = response.message;
         updateModal.value.openModal();
         emit('loading', false);
      }

      onMounted(async() => {
         emit('loading', true);
         let summaryResponse = await thirdPartyMemberApi.summary();
         let profileResponse = await thirdPartyMemberApi.getProfile();
         await setPointAndLevel(summaryResponse.aaData);
         setProfileAndAddress(profileResponse.aaData.member_profile);
         emit('loading', false);
      });

      return { genderList, questionList, addressInfo, cityList, districtList, pointLevelInfo, profileInfo, form, updateModal, updateInfo, submitHandler }
   }
}
</script>

<style lang="scss" scoped>
.level-point-panel {
   @extend %bwtFlex;
   margin-bottom: 20px;
   .text-primary {
      margin-left: 5px;
   }
}
.profile-block {
   padding: 50px 25px;
   border: 1px solid map-get($borderColor, outer);
}
.form-layout {
   .form-row {
      justify-content: center;
      .form-title {
         flex: 0 0 160px;
      }
      .form-content {
         flex: 0 0 40%;
      }
   }
}
.btnBox {
   button {
      width: 150px;
   }
}
</style>