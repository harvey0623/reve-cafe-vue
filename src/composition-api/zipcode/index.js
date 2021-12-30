import { reactive, computed, watch } from '@vue/composition-api'
import { administrativeArea } from './source.js';
export const zipcode = () => {
   let source = reactive(administrativeArea);
   let addressInfo = reactive({ city: '', district: '', code: 0 });
   let cityList = computed(() => source.map(item => item.name));
   let districtList = computed(() => {
      let arr = source.find(item => item.name === addressInfo.city);
      if (arr !== undefined) return arr.region;
      else return [];
   });

   let setCode = () => {
      let targetDistrict = districtList.value.find(item => item.name === addressInfo.district);
      addressInfo.code = targetDistrict !== undefined ? targetDistrict.code : 0;
   }

   watch(districtList, () => {
      addressInfo.district = '';
      addressInfo.code = 0;
   });

   watch(() => addressInfo.district, () => {
      setCode();
   });

   return { addressInfo, cityList, districtList };
}