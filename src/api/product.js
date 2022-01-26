import { httpConfig } from './config.js';

export const productRequest = {
   product(payload) {
      return httpConfig({
         url: '/product',
         method: 'get',
         params: payload
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   },
   product_recommend() {
      return httpConfig({
         url: '/product/product_recommend_meta',
         method: 'get',
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   },
   product_detail(productCode) {
      return httpConfig({
         url: `/product/product_detail/${productCode}`,
         method: 'get',
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   },
   product_category(payload) {
      return httpConfig({
         url: '/product/product_category',
         method: 'get',
         params: payload
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   }
}