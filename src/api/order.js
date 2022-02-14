import { httpConfig } from './config.js';

export const orderRequest = {
   pay() {
      return httpConfig({
         url: '/order/pay',
         method: 'get',
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   },
   invoice() {
      return httpConfig({
         url: '/order/invoice',
         method: 'get',
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   },
}