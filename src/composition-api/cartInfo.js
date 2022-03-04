import { reactive } from '@vue/composition-api'

export const cartInfo = () => {
   let invoiceMappingKey = reactive({
      1: 'vInvoicePhoneId', 
      2: 'vInvoiceUserId', 
      3: 'vInvoiceLoveId', 
      4: 'vInvoiceEmail', 
      5: 'vInvoiceNum'
   });

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

   return { invoiceMappingKey, processNormalProduct, processActivityProduct };
}