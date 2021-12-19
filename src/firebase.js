import firebase from 'firebase/compat/app';
import {getFirestore} from '@firebase/firestore';
import {getAuth} from 'firebase/auth';

require('dotenv').config();


const firebaseConfig = {
    apiKey: "AIzaSyAwJo8icO7X3BhRBkJTEBp-1mS9GNynyFI",
    authDomain: "thedoorman-e4d3d.firebaseapp.com",
    projectId: "thedoorman-e4d3d",
    storageBucket: "thedoorman-e4d3d.appspot.com",
    messagingSenderId: "632580762351",
    appId: "1:632580762351:web:29b17298d281741614891a"
  };

  
const app = firebase.initializeApp(firebaseConfig);
const fireDb = getFirestore(app);
const auth = getAuth(app);

export {fireDb,auth}