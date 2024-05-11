import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDeSPm73ojWQHuZktGAp-U9ONRD5pvhsDo",
  authDomain: "todoapp-2ecef.firebaseapp.com",
  projectId: "todoapp-2ecef",
  storageBucket: "todoapp-2ecef.appspot.com",
  messagingSenderId: "500088514355",
  appId: "1:500088514355:web:f705d344a3c1921130c046",
  measurementId: "G-MHLEB5NW3W",
}
export const FIREBASE_APP = initializeApp(firebaseConfig)
export const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
export const FIRESTORE_AUTH = getAuth(FIREBASE_APP)

