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
   ship() {
      return httpConfig({
         url: '/order/shipment',
         method: 'get',
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   },
   outbound() {
      return httpConfig({
         url: '/order/shipment_outbound',
         method: 'get',
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   },
}