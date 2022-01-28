import { httpConfig } from './config.js';

export const thirdPartyMemberRequest = {
   getProfile() {
      return httpConfig({
         url: '/third_party_member/profile',
         method: 'get',
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   },
   updateProfile(payload) {
      return httpConfig({
         url: '/third_party_member/profile',
         method: 'post',
         data: payload
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   },
   summary() {
      return httpConfig({
         url: '/third_party_member/summary',
         method: 'get',
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   },
   level(payload) {
      return httpConfig({
         url: '/third_party_member/level_information',
         method: 'post',
         data: payload
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   }
}