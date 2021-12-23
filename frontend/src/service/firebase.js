import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "readinghelper-d9ecf.firebaseapp.com",
  DBURL: "readinghelper-d9ecf-default-rtdb.firebaseio.com",
  projectId: "readinghelper-d9ecf",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDB = firebaseApp.database();
