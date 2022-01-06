import CryptoJS from 'crypto-js';

export const wm_aes_encode = function (input) {
   let keyHash = CryptoJS.SHA384(process.env.VUE_APP_AESKEY);
   let key = CryptoJS.enc.Hex.parse(keyHash.toString().substring(0, 64));
   let iv = CryptoJS.enc.Hex.parse(keyHash.toString().substring(64, 96));
   let encrypted = CryptoJS.AES.encrypt(input, key, { iv: iv });
   return encrypted.toString();
}