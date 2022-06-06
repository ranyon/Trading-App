import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDsX2q5mIo_RHRjw-Bh45s01NsQjhCAQhY",
  authDomain: "tradingapp-d3499.firebaseapp.com",
  projectId: "tradingapp-d3499",
  storageBucket: "tradingapp-d3499.appspot.com",
  messagingSenderId: "1020387519818",
  appId: "1:1020387519818:web:0a3353593a0ab3fc16a5b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);