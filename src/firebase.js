import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9v9DLgrX0w-3DHzYRXfQBzbKjFhUEBQ0",
  authDomain: "ways-chat-app-b4b87.firebaseapp.com",
  projectId: "ways-chat-app-b4b87",
  storageBucket: "ways-chat-app-b4b87.appspot.com",
  messagingSenderId: "1047061473319",
  appId: "1:1047061473319:web:ee627499e8943b92fb0602",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const provider = new GoogleAuthProvider();
