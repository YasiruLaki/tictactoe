import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCyOFoP4shMwZ0swoky5yJm8Ca5F6_4TcU",
    authDomain: "tictac-f4d65.firebaseapp.com",
    projectId: "tictac-f4d65",
    storageBucket: "tictac-f4d65.appspot.com",
    messagingSenderId: "1044189505549",
    appId: "1:1044189505549:web:53a5620b555bdf2d63cd44",
    measurementId: "G-CHS7N3PZ0D"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);