// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCVqSJfWWQ0Gfy8jter-i3WAM81VyGtR0k",
//   authDomain: "authentication-fceb9.firebaseapp.com",
//   projectId: "authentication-fceb9",
//   storageBucket: "authentication-fceb9.appspot.com",
//   messagingSenderId: "608539328442",
//   appId: "1:608539328442:web:68752bdf2c75eec15b6783",
//   measurementId: "G-X48P35TTL7"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth();
// const db = getFirestore(app);
// export {app,auth,db} ;


// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
 const firebaseConfig = {
   apiKey: "AIzaSyCVqSJfWWQ0Gfy8jter-i3WAM81VyGtR0k",
  authDomain: "authentication-fceb9.firebaseapp.com",
  projectId: "authentication-fceb9",
   storageBucket: "authentication-fceb9.appspot.com",
   messagingSenderId: "608539328442",
   appId: "1:608539328442:web:68752bdf2c75eec15b6783",
   measurementId: "G-X48P35TTL7"
 };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export { db,auth };

