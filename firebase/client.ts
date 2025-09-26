// Import the functions you need from the SDKs you need
import {initializeApp,getApp,getApps} from "firebase/app";   
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTstwLI070Ua3jM-verKgq6a3HVezfL6I",
  authDomain: "interviewai-taker.firebaseapp.com",
  projectId: "interviewai-taker",
  storageBucket: "interviewai-taker.firebasestorage.app",
  messagingSenderId: "517820196349",
  appId: "1:517820196349:web:99894a6f6667e3508a6594",
  measurementId: "G-7RQ88TC1ZW"
};

// Initialize Firebase
const app = !getApps().length?initializeApp(firebaseConfig):getApp();
export const auth=getAuth(app);
export const db=getFirestore(app);