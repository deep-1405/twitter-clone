import { getApp, getApps } from "firebase/app";
// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: "twitter-v1-6a0d8.firebaseapp.com",
	projectId: "twitter-v1-6a0d8",
	storageBucket: "twitter-v1-6a0d8.appspot.com",
	messagingSenderId: "334598974996",
	appId: "1:334598974996:web:a16f62518c1c5af1044101",
	measurementId: "G-Y5F3Q3QG2X",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

const storage = getStorage();

export { app, db, storage };
