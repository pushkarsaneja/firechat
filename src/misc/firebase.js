import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAtCXg9zIP-EftA5qDNG42o6ySMqr62hqI',
  authDomain: 'chatapp-6a0e2.firebaseapp.com',
  projectId: 'chatapp-6a0e2',
  storageBucket: 'chatapp-6a0e2.appspot.com',
  messagingSenderId: '136464511526',
  appId: '1:136464511526:web:1a6612cbc39a80d7506ce7',
};

export const app = initializeApp(firebaseConfig);
