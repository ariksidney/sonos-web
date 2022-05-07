import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from "firebase/functions";


const firebase = initializeApp({
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId
});

const functions = getFunctions(firebase, "europe-west2");
const getAccessToken = httpsCallable(functions, 'getAccessToken');
const genericSonosRequest = httpsCallable(functions, 'genericSonosRequest');

export { getAccessToken, genericSonosRequest };