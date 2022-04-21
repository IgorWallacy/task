import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

let firebaseConfig = {
  apiKey: "AIzaSyBWf4bjNgxumzU7IOpRNQxNB9ozcAQc8ro",
  authDomain: "tarefas-cd885.firebaseapp.com",
  projectId: "tarefas-cd885",
  storageBucket: "tarefas-cd885.appspot.com",
  messagingSenderId: "444014597289",
  appId: "1:444014597289:web:01b972d14455f519d2c5b8",
  measurementId: "G-8WB83C7HWB",
};

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
