import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbejoeLbM-o538MUnUI4Ebqkzv96kD7dY",
  authDomain: "test-social-media-6afb8.firebaseapp.com",
  projectId: "test-social-media-6afb8",
  storageBucket: "test-social-media-6afb8.appspot.com",
  messagingSenderId: "1023930113299",
  appId: "1:1023930113299:web:442ca823667254e92e4ee6",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
