import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdC1-9nE0oXaFUYKtdToU4CoPHtUdZqAQ",
    authDomain: "uber-challenge-204b0.firebaseapp.com",
    projectId: "uber-challenge-204b0",
    storageBucket: "uber-challenge-204b0.appspot.com",
    messagingSenderId: "613178940855",
    appId: "1:613178940855:web:e28fd47e22c962a33cdc32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth };