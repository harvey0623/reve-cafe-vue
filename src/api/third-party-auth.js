import { httpConfig } from './config.js';

export const thirdPartyAuthRequest = {
   login(payload) {
      return httpConfig({
         url: '/third_party_auth/login',
         method: 'post',
         data: { ...payload }
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      });
   },
   logout() {
      return httpConfig({
         url: '/third_party_auth/logout',
         method: 'post',
         data: {}
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      });
   },
   me() {
      return httpConfig({ //登入狀態驗證
         url: '/third_party_auth/me',
         method: 'post',
         data: {}
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      });
   },
   refresh() {
      return httpConfig({ //刷新jwt token
         url: '/third_party_auth/refresh',
         method: 'post',
         data: {}
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      });
   },
   register_check(payload) {
      return httpConfig({
         url: '/third_party_auth/register_check',
         method: 'post',
         data: payload
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      });
   },
   register(payload) {
      return httpConfig({
         url: '/third_party_auth/register',
         method: 'post',
         data: payload
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      });
   }
}