// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-a17ea.firebaseapp.com",
  projectId: "estate-a17ea",
  storageBucket: "estate-a17ea.firebasestorage.app",
  messagingSenderId: "120208845432",
  appId: "1:120208845432:web:17dcb06e5a73cb905ddb8d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
