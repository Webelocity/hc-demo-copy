import { getApps, getApp, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlCInv3FkuNcRcrSs5YY-OpJXb5EE8YGk",
    authDomain: "amherstsupply-a12de.firebaseapp.com",
    projectId: "amherstsupply-a12de",
    storageBucket: "amherstsupply-a12de.firebasestorage.app",
    messagingSenderId: "1090282345944",
    appId: "1:1090282345944:web:183a852e0cc3446ad84ead"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { storage, auth, googleProvider };
