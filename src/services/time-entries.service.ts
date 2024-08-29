import { firestore, TIME_ENTRY_COLLECTION } from "../firebase";
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore"; // onSnapshot to listen to changes to DB
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
          id: doc.id,
          ...doc.data()
        })) as ITimeEntry[];
        return entries;
    }
    catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
};

export const deleteTimeEntry = async (id: string): Promise<void> => {
    try {
      const entryDoc = doc(firestore, TIME_ENTRY_COLLECTION, id);
      await deleteDoc(entryDoc);
    } catch (error) {
      console.error('Error deleting time entry: ', error);
    }
  };  