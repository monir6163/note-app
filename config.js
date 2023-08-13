import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDZz8xMb7elyiwcOO2N2DK2r-bDvBfVxzw",
    authDomain: "react-native-note-app-dc59d.firebaseapp.com",
    projectId: "react-native-note-app-dc59d",
    storageBucket: "react-native-note-app-dc59d.appspot.com",
    messagingSenderId: "41961998108",
    appId: "1:41961998108:web:3b24f11a9d2690b9991cd9",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();

export { auth, db };
