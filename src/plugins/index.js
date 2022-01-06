import { storage } from './storage/index.js';
import { wm_aes_encode } from './crypto/index.js';

export const storageObj = storage;
export const wm_aes = wm_aes_encode;