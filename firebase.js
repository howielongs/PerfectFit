import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
//Deleted key info for public github repo
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;
