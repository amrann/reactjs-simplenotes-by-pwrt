import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDJRv5IWwfJfmvG_SuJBUSDBiiCugpdblI",
  authDomain: "simple-notes-by-pwrt.firebaseapp.com",
  databaseURL: "https://simple-notes-by-pwrt.firebaseio.com",
  projectId: "simple-notes-by-pwrt",
  storageBucket: "simple-notes-by-pwrt.appspot.com",
  messagingSenderId: "490908715282",
  appId: "1:490908715282:web:dc030df2252c7c53648bcb",
  measurementId: "G-QBEEFCVQJG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// Get a reference to the database service
export const databes = firebase.database();

export default firebase;