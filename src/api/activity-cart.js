import { httpConfig } from './config.js';

export const activityCartRequest = {
   getCart(payload) {
      return httpConfig({
         url: '/activity_cart/product_promotions/bundle',
         method: 'get',
         data: payload
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   },
   addCart(payload) {
      return httpConfig({
         url: '/activity_cart/product_promotions/bundle',
         method: 'post',
         data: payload
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   }
}