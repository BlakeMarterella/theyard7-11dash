import firebase from "../firebase";
import ITimeEntry from "../types/time-entry.types";

const db = firebase.ref("/time-entries");

class FirestoreService {
  getAll() {
    return db;
  }

  create(tutorial: ITimeEntry) {
    return db.push(tutorial);
  }

  update(key: string, value: any) {
    return db.child(key).update(value);
  }

  delete(key: string) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new FirestoreService();
