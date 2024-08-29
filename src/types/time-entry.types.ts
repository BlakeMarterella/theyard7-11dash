import { Timestamp } from "firebase/firestore";

export default interface ITimeEntry {
    key?: string | null,
    date: Timestamp,
    runner: string,
    time: Timestamp,
    published?: boolean,
  }
  