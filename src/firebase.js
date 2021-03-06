import firebase from "firebase/app"
import "firebase/auth"

 var firebaseConfig = {
    apiKey: "AIzaSyC7BW6LhfRK0vTNe1PoktIKVfFskqG4L3o",
    authDomain: "biodiligence.firebaseapp.com",
    projectId: "biodiligence",
    storageBucket: "biodiligence.appspot.com",
    messagingSenderId: "846728521230",
    appId: "1:846728521230:web:dea43c27d13743a1f7be5f",
    measurementId: "G-BXNE3JF0TM"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);





export const auth = app.auth()
export default app
