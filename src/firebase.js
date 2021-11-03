import firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import "firebase/analytics";

let database;
let config = {
  apiKey: "AIzaSyAqesPk0vqtdfJBnUlwD3TV-91lxOOqido",
  authDomain: "ecoplanet-9cf46.firebaseapp.com",
  projectId: "ecoplanet-9cf46",
  storageBucket: "ecoplanet-9cf46.appspot.com",
  messagingSenderId: "810414226508",
  appId: "1:810414226508:web:09c57ee0591bb7a5fdc8e9",
  measurementId: "G-2EDTCLRKFK",
};
export const fire = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
    firebase.analytics();
  }
  database = firebase.database();
};
