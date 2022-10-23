
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDqi98anYSiBFHYsq915rbdGzCSgQ7A0As",
  authDomain: "user-data-authentication.firebaseapp.com",
  projectId: "user-data-authentication",
  storageBucket: "user-data-authentication.appspot.com",
  messagingSenderId: "456060124241",
  appId: "1:456060124241:web:54f2ab66beb2f34d3d8c70",
  measurementId: "G-PWFFV0RQVQ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;