// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { getFirestore, collection, addDoc, getDocs, getDoc, doc, query, orderBy, serverTimestamp, updateDoc } from "firebase/firestore";
import { store } from "./store";

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
        const docRef = await addDoc(collection(db, "zero"), {
            ...data,
            timestamp: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function writePersonalData(data: object, email: string) {
    const collectionId = email;
    try {
        const docRef = await addDoc(collection(db, collectionId), {
            ...data,
            timestamp: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function fetchAllRows(email: string) {
    const q = query(collection(db, email), orderBy('timestamp', 'desc'));
    return await getDocs(q);
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
            
            // console.log('the login magic worked', { user });
            const token = user.accessToken;


            user.email && token && store.doAuth(user.email, token);
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log({ errorCode, errorMessage });
        });
}

export async function updateMissingTimestamps() {
    const querySnapshot = await getDocs(collection(db, "zero"));
    querySnapshot.forEach(async (document) => {
        if (!document.data().timestamp) {
            await updateDoc(doc(db, "zero", document.id), {
                timestamp: serverTimestamp()
            });
        }
    });
}

export async function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('the login magic worked', { user });

            const token = user.accessToken;

            user.email && token && store.doAuth(user.email, token);
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

// updateMissingTimestamps().then(() => {
//     console.log("All documents updated with a timestamp.");
// }).catch((error) => {
//     console.error("Error updating documents: ", error);
// });