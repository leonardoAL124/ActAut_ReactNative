// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDchBNBnm9DeSOsheMIso2e0iClVHpZldk",
    authDomain: "actautonoma.firebaseapp.com",
    databaseURL: "https://actautonoma-default-rtdb.firebaseio.com",
    projectId: "actautonoma",
    storageBucket: "actautonoma.appspot.com",
    messagingSenderId: "138101169348",
    appId: "1:138101169348:web:5962a8c4442020ed0fbd91"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Referencia al servicio de la BDD
export const dbRealTime = getDatabase(firebase);