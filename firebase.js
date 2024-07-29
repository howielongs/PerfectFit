import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
//Deleted key info for public github repo
const firebaseConfig = {
  apiKey: "",
  authDomain: "perfectfit-swiping.firebaseapp.com",
  projectId: "perfectfit-swiping",
  storageBucket: "perfectfit-swiping.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;
