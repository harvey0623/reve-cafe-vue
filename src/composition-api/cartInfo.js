import { reactive } from '@vue/composition-api'

export const cartInfo = () => {
   let invoiceMappingKey = reactive({
      1: 'vInvoicePhoneId', 
      2: 'vInvoiceUserId', 
      3: 'vInvoiceLoveId', 
      4: 'vInvoiceEmail', 
      5: 'vInvoiceNum'
   });

   return { invoiceMappingKey };
}