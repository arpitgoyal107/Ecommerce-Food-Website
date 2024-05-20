// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;


// const firebaseConfig = {
//     apiKey: "AIzaSyBpG3ggT6mr3U1PQvXSs8xSsQR0s4eON6U",
//     authDomain: "foodi-102a5.firebaseapp.com",
//     projectId: "foodi-102a5",
//     storageBucket: "foodi-102a5.appspot.com",
//     messagingSenderId: "558327925072",
//     appId: "1:558327925072:web:b9e46fa76cfdc28a478455"
//   };