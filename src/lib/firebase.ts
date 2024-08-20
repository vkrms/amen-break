// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { getFirestore, collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { checkIfStateModificationsAreAllowed } from "mobx/dist/internal";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCc8X4lYSuJKxcASFmOG-TxatSWQTq_Ifs",
    authDomain: "amen-brother.firebaseapp.com",
    projectId: "amen-brother",
    storageBucket: "amen-brother.appspot.com",
    messagingSenderId: "848258243078",
    appId: "1:848258243078:web:8ada9fb6aee7d2e5d08187",
    measurementId: "G-HX0FZQZXC7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function writeData(data: object) {
    try {
        const docRef = await addDoc(collection(db, "zero"), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function fetchAllRows() {
    return await getDocs(collection(db, "zero"));
}

export async function fetchThought(id: string) {
    try {
        const docRef = doc(db, "zero", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (e) {
        console.error("Error getting document: ", e);
    }

}

const auth = getAuth();

export async function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log({ errorCode, errorMessage });
        });
}