import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

const firebaseConfig = {
  apiKey: "AIzaSyD6VZK0h5YznRMLAStZPavep5WLt-qXXVY",
  authDomain: "your-auth-domain",
  projectId: "tori-5e0d5",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
const auth = getAuth(app);

// Set persistence to AsyncStorage
setPersistence(auth, getReactNativePersistence(AsyncStorage))
  .then(() => {
    console.log('Auth persistence set to AsyncStorage');
  })
  .catch((error) => {
    console.error('Error setting persistence', error);
  });

export { auth, LoginManager, AccessToken };