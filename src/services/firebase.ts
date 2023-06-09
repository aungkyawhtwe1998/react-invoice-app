import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
//   measurementId: import.meta.env.VITE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCseQ-EHmiqhFhHoLOQRLado-k6JskiC00",
  authDomain: "react-invoice-app-defc1.firebaseapp.com",
  projectId: "react-invoice-app-defc1",
  storageBucket: "react-invoice-app-defc1.appspot.com",
  messagingSenderId: "112354711344",
  appId: "1:112354711344:web:48adbff138fc75710e5af5",
  measurementId: "G-XX886VMJJV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
