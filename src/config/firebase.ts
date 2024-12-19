import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  databaseURL: "https://wiss-repair-store-default-rtdb.firebaseio.com",
  apiKey: "AIzaSyCS-1-nfJuY5yfyTAK4KAhQrcgo0X7ghdI",
  authDomain: "wiss-repair-store.firebaseapp.com",
  projectId: "wiss-repair-store",
  storageBucket: "wiss-repair-store.appspot.com",
  messagingSenderId: "45459158464",
  appId: "1:45459158464:web:dcfbf4c3b8280a0547c425"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);