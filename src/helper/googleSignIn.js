import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../misc/firebase';

const provider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  await signInWithPopup(auth, provider);
};
