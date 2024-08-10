import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_SECRET_KEY as string;

export const saveManager = {
  save: (key: string, data: any) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    localStorage.setItem(key, encryptedData);
  },
  load: (key: string) => {
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      try {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      } catch (error) {
        console.error('Error parsing data', error);
        localStorage.removeItem(key);
      }
    }
    return null;
  },
  reset: (key: string) => localStorage.removeItem(key),
};
