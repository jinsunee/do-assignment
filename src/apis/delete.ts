import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const db = firestore();
const firebaseAuth = auth();

export async function signOut() {
  await firebaseAuth.signOut();
}
