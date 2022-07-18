// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDSIIA2wYMaX5ATH2EAEOURPoawaaBAuk",
  authDomain: "todo-app-7f718.firebaseapp.com",
  databaseURL: "https://todo-app-7f718-default-rtdb.firebaseio.com",
  projectId: "todo-app-7f718",
  storageBucket: "todo-app-7f718.appspot.com",
  messagingSenderId: "606016824224",
  appId: "1:606016824224:web:feea7e0684174233e6bac5",
  measurementId: "G-LTY9HWVPBS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
