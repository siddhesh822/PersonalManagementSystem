import Rebase from "re-base";
import firebase from "firebase";
import "firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAOnGkFlPauLTan8fJqanQvHqNpUPxga4Q",
  authDomain: "personal-management-syst-15a93.firebaseapp.com",
  databaseURL: "https://personal-management-syst-15a93.firebaseio.com",
  projectId: "personal-management-syst-15a93",
  storageBucket: "personal-management-syst-15a93.appspot.com",
  messagingSenderId: "586841745398",
  appId: "1:586841745398:web:4a5cd41a8a40929031c9d7",
  measurementId: "G-8QJG3DFY31"
});
const storage = firebase.storage();
const base = Rebase.createClass(firebaseApp.database());
export { firebaseApp, storage };
export default base;
