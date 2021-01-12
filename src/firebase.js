// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDuzw6WOIm7VfunbTDFRPZm6ZUG989q7xw",
    authDomain: "web-app-32991.firebaseapp.com",
    databaseURL: "https://web-app-32991.firebaseio.com",
    projectId: "web-app-32991",
    storageBucket: "web-app-32991.appspot.com",
    messagingSenderId: "154423913231",
    appId: "1:154423913231:web:9cc99ba786f6e82ab1ec7a",
    measurementId: "G-HP30B50WPT"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
 

export { auth, provider };
export default db;