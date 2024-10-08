import { Timestamp } from "firebase/firestore";

export default interface ITimeEntry {
    id?: string | null,
    name: string,
    date: Timestamp,
    time: number,
}
 