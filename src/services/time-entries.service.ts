/* eslint-disable @typescript-eslint/no-explicit-any */
// import db from "../firebase";
import { firestore, TIME_ENTRY_COLLECTION } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore"; // onSnapshot to listen to changes to DB
import ITimeEntry from "../types/time-entry.types";

const timeEntriesCollection = collection(firestore, TIME_ENTRY_COLLECTION);

export const addTimeEntry = async (entry: Omit<ITimeEntry, 'id'>): Promise<void> => {
    try {
      await addDoc(timeEntriesCollection, entry);
    } catch (error) {
      console.error('Error adding time entry: ', error);
    }
};  

export const getAllTimeEntries = async (): Promise<ITimeEntry[]> => {
    try {
        const snapshot = await getDocs(timeEntriesCollection);
        const entries: ITimeEntry[] = snapshot.docs.map(doc => ({
          ...doc.data()
        })) as ITimeEntry[];
        return entries;
    }
    catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
};