import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import {UserType} from '../types';
import firestore from '@react-native-firebase/firestore';

const firebaseAuth = auth();
const db = firestore();

export async function confirmSignIn(email: string): Promise<number> {
  try {
    const user = await db
      .collection('users')
      .where('email', '==', email.toLowerCase())
      .get();

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
      email.toLowerCase(),
      password,
    );

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

    console.log(snapshot.data());
    if (!snapshot.data()) {
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

export const confirmAccessCode = async (
  accessCode: string,
): Promise<string> => {
  try {
    const query = await db
      .collection('classRooms')
      .where('accessCode', '==', accessCode)
      .get();

    let classRoomUID: string = '';
    query.forEach((q) => {
      classRoomUID = q.id;
    });

    return classRoomUID;
  } catch (error) {
    console.log(error);
    return '';
  }
};
