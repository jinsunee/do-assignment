import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import {UserType} from '../types';
import firestore from '@react-native-firebase/firestore';

const firebaseAuth = auth();
const db = firestore();

export async function confirmSignIn(email: string): Promise<number> {
  try {
    const user = await db.collection('users').where('email', '==', email).get();

    return user.size;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export async function signInEmail(
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.User | null> {
  try {
    const query = await firebaseAuth.signInWithEmailAndPassword(
      email,
      password,
    );

    console.log(query.user);
    return query?.user || null;
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function fetchAccessCodeSize(accessCode: string): Promise<number> {
  const snapshot = await db
    .collection('classRooms')
    .where('accessCode', '==', accessCode)
    .get();

  return snapshot.size;
}

export async function fetchUserType(userUID: string): Promise<UserType | null> {
  try {
    const snapshot = await db.collection('users').doc(userUID).get();

    if (!snapshot) {
      return null;
    }

    return snapshot.data()?.userType === UserType.STUDENT
      ? UserType.STUDENT
      : UserType.TEACHER;
  } catch (error) {
    console.log(error);
    return null;
  }
}
