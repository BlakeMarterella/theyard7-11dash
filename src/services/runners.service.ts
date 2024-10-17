import { firestore, RUNNERS_COLLECTION } from '../firebase';
import { collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore';
import IRunner from '../types/runner';

const runnersCollection = collection(firestore, RUNNERS_COLLECTION);

export const addRunner = async (runner: Omit<IRunner, 'id'>): Promise<void> => {
    try {
        runner.isDeleted = false;
        await addDoc(runnersCollection, runner);
    } catch (error) {
        console.error('Error adding runner: ', error);
    }
};

export const getAllRunners = async (): Promise<IRunner[]> => {
    try {
        const snapshot = await getDocs(runnersCollection);
        const runners: IRunner[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as IRunner[];
        return runners;
    } catch (error) {
        console.error('Error getting documents: ', error);
        return [];
    }
};

export const deleteRunner = async (id: string): Promise<void> => {
    try {
        const runnerDoc = doc(firestore, RUNNERS_COLLECTION, id);
        await deleteDoc(runnerDoc);
    } catch (error) {
        console.error('Error deleting runner: ', error);
    }
};