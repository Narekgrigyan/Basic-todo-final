import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCGRFuHCohpMcyr9yuJLhFt0KSLNRkv1C8",
    authDomain: "portfolio-ebcfc.firebaseapp.com",
    projectId: "portfolio-ebcfc",
    storageBucket: "portfolio-ebcfc.appspot.com",
    messagingSenderId: "946865753071",
    appId: "1:946865753071:web:3b1ba4ca058ed7612dc41a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {
    auth,
    app,
    db
}