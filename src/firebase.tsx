import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// https://firebase.google.com/docs/web/setup#available-libraries

export const app = initializeApp({
  apiKey: "AIzaSyBafX5UpQGxMyJOwL8nlP4AGWVF4kFVy78",
  authDomain: "theyard7-11dash.firebaseapp.com",
  projectId: "theyard7-11dash",
  storageBucket: "theyard7-11dash.appspot.com",
  messagingSenderId: "52229416831",
  appId: "1:52229416831:web:3e61dfa4c70931c6abdc4a",
  measurementId: "G-7R54RNTLQ7"
});

export const firestore = getFirestore(app);
export const TIME_ENTRY_COLLECTION = "time-entries";