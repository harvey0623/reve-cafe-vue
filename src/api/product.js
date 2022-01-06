import { httpConfig } from './config.js';

export const productRequest = {
   product_recommend() {
      return httpConfig({
         url: '/product/product_recommend_meta',
         method: 'get',
         data: {}
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   }
}