import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const updateUserData = async (uid, newData) => {
  await updateDoc(doc(db, 'users', uid), newData);
};
