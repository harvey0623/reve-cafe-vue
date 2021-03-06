import { httpConfig } from './config.js';

export const cartRequest = {
   getCart(payload) {
      return httpConfig({
         url: '/cart',
         method: 'get',
         data: payload
      }).then(res => {
         return res.data;
      }).catch(err => {
         console.log(err.response)
         return err.response.data;
      })
   },
   addCart(payload) {
      return httpConfig({
         url: '/cart/add',
         method: 'post',
         data: payload
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   },
   removeCart(payload) {
      return httpConfig({
         url: `/cart/${payload}`,
         method: 'delete',
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   }
}