import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY_AUTH,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN_AUTH,
    projectId: process.env.REACT_APP_PROJECTID_AUTH,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET_AUTH,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID_AUTH,
    appId: process.env.REACT_APP_APPID_AUTH,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;