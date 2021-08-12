import firebase from "firebase";
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyDHOUDJ8KZSl1oFt2XvvFmYbHdtmPvsrJU",
    authDomain: "arclass-5a70a.firebaseapp.com",
    projectId: "arclass-5a70a",
    storageBucket: "arclass-5a70a.appspot.com",
    messagingSenderId: "64249992711",
    appId: "1:64249992711:web:742d4bd713b3e6062b3ca2",
    measurementId: "G-H3XPE2JFBV"
});

// export the packages for the authentication
export const db = app.firestore()
export const auth = app.auth()
export const storage = app.storage()
