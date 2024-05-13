// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv6UnQEF-9nHpgQyJtBI1cxtLb3Vi47y8",
  authDomain: "newstart-28a53.firebaseapp.com",
  projectId: "newstart-28a53",
  storageBucket: "newstart-28a53.appspot.com",
  messagingSenderId: "222654623047",
  appId: "1:222654623047:web:83b8c43a4271a38faeb062",
  measurementId: "G-ZHYGNY42DY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);