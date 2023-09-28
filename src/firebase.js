import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD_eDn_oseZTuJpGCBYFV3zRTHwG-lou2E",
  authDomain: "whatsapp-clone-by-rajat.firebaseapp.com",
  projectId: "whatsapp-clone-by-rajat",
  storageBucket: "whatsapp-clone-by-rajat.appspot.com",
  messagingSenderId: "727898586809",
  appId: "1:727898586809:web:488efa159d1ce3acfae568",
  measurementId: "G-12SEHT1Z3Q"
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider };

export default db;
