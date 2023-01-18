/* eslint-disable import/no-extraneous-dependencies */
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC1IAgqM592QO0MrJFsFktVmWnG9sDTxQ0',
  authDomain: 'crud-next-99abe.firebaseapp.com',
  projectId: 'crud-next-99abe',
  storageBucket: 'crud-next-99abe.appspot.com',
  messagingSenderId: '1084885248361',
  appId: '1:1084885248361:web:87506f476986d933c835f8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage();
