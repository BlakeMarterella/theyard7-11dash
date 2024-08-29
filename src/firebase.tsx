import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// https://firebase.google.com/docs/web/setup#available-libraries

export const app = initializeApp({
  apiKey: import.meta.env.API_KEY,
  authDomain: import.meta.env.AUTH_DOMAIN,
  projectId: "theyard7-11dash",
  storageBucket: import.meta.env.STORAGE_BUCKET,
  messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_ID,
  measurementId: import.meta.env.MEASUREMENT_ID
});

export const firestore = getFirestore(app);
export const TIME_ENTRY_COLLECTION = "time-entries";