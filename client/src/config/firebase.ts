// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEY_FIREBASE,
  authDomain: "social-network-6cc1f.firebaseapp.com",
  projectId: "social-network-6cc1f",
  storageBucket: "social-network-6cc1f.appspot.com",
  messagingSenderId: "949242211375",
  appId: "1:949242211375:web:6d1b90830897d963762ada",
  measurementId: "G-LQE4LKMDHP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();