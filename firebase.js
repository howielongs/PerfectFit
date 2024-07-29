import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDABD3RqQ6XlEEpcTNu7uew61nfuTthkx4",
  authDomain: "perfectfit-swiping.firebaseapp.com",
  projectId: "perfectfit-swiping",
  storageBucket: "perfectfit-swiping.appspot.com",
  messagingSenderId: "165410356181",
  appId: "1:165410356181:web:f59278905a5c032fce1b5c",
  measurementId: "G-9S8041LP46"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;