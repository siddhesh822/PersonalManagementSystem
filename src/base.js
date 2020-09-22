import Rebase from "re-base";
import firebase from "firebase";
import "firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
});
const storage = firebase.storage();
const base = Rebase.createClass(firebaseApp.database());
export { firebaseApp, storage };
export default base;
