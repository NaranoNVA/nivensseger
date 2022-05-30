import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCmAe0yY0NX0IdV0uldgz82RFVgUrKYBg8",
    authDomain: "genshinbuild-5d208.firebaseapp.com",
    projectId: "genshinbuild-5d208",
    storageBucket: "genshinbuild-5d208.appspot.com",
    messagingSenderId: "813876012533",
    appId: "1:813876012533:web:aaefc45d99f97b320aecbc",
    measurementId: "G-VCE15RW0CN"
  };

export const firebaseApp = initializeApp(firebaseConfig);
export const fireStore = getFirestore(firebaseApp);
export const fireStorage = getStorage(firebaseApp);

