<template>
   <div class="fill-row">
      <p class="title required">{{ fieldName }}</p>
      <div class="content address">
         <select class="form-control" v-model="cityVal" :disabled="disabled">
            <option value="" disabled>選擇縣市</option>
            <option v-for="city in cityList" :key="city">{{ city }}</option>
         </select>
      </div>
      <div class="content address">
         <select class="form-control" v-model="districtVal" :disabled="disabled">
            <option value="" disabled>選擇地區</option>
            <option v-for="district in districtList" :key="district.name">{{ district.name }}</option>
         </select>
      </div>
      <div class="content remained">
         <input type="text" class="form-control" v-model="addressVal" placeholder="請填寫地址" :disabled="disabled">
      </div>
   </div>
</template>

<script>
import { reactive, computed, watch } from '@vue/composition-api'
import { administrativeArea } from '@/composition-api/zipcode/source.js'
export default {
   props: {
      fieldName: { type: String, default: '' },
      city: { type: String, required: true },
      district: { type: String, required: true },
      zipcode: { required: true },
      address: { type: String, required: true },
      disabled: { type: Boolean, default: false }
   },
   setup(props, { emit }) {
      let source = reactive(administrativeArea);
      let cityList = computed(() => source.map(item => item.name));

      let districtList = computed(() => {
         let obj = source.find(item => item.name === cityVal.value);
         if (obj !== undefined) return obj.region;
         else return [];
      });

      let cityVal = computed({
         get(val) {
            return props.city;
         },
         set(val) {
            emit('update:city', val);
         }
      });

      let districtVal = computed({
         get() {
            return props.district;
         },
         set(val) {
            emit('update:district', val);
         }
      });

      let zipcodeVal = computed({
         get() {
            return props.zipcode;
         },
         set(val) {
            emit('update:zipcode', val);
         }
      });

      let addressVal = computed({
         get() {
            return props.address;
         },
         set(val) {
            emit('update:address', val);
         }
      });

      watch(() => districtList.value, (val) => {
         districtVal.value = val[0] !== undefined ? val[0].name : '';
      });

      watch(() => districtVal.value, (val) => {
         let obj = districtList.value.find(item => item.name === val);
         zipcodeVal.value = obj !== undefined ? obj.code : 0;
      }, {
         immediate: true
      });

      return { cityList, cityVal, districtList, districtVal, addressVal }
   }
}
</script>

<style>

</style>