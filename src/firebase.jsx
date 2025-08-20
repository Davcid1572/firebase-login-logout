// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDp9c_8CFnzKMZSX8y75WLHCegNtHEWUa4",
  authDomain: "fir-login-logout-7f801.firebaseapp.com",
  projectId: "fir-login-logout-7f801",
  storageBucket: "fir-login-logout-7f801.firebasestorage.app",
  messagingSenderId: "289353199915",
  appId: "1:289353199915:web:cae8c8c0a131716fdf556e",
  measurementId: "G-YW6NS3YPL9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db, doc, setDoc };
