import { httpConfig } from './config.js';

export const activityRequest = {
   fullAmount() {
      return httpConfig({
         url: '/activity/product_promotions/full_amount',
         method: 'get',
         data: {}
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   },
   red_with_green() {
      return httpConfig({
         url: '/activity/product_promotions/red_with_green',
         method: 'get',
         data: {}
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   },
}