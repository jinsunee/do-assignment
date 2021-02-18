import {ClassRoom, UserType} from '../types';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

export async function confirmSignIn(email: string): Promise<number> {
  try {
    const db = firestore();

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
    const firebaseAuth = auth();

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
  try {
    const db = firestore();

    const snapshot = await db
      .collection('classRooms')
      .where('accessCode', '==', accessCode)
      .get();

    return snapshot.size;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export async function fetchUserType(userUID: string): Promise<UserType | null> {
  try {
    const db = firestore();

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
    const db = firestore();

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

export async function fetchClassRoom(
  userUID: string,
): Promise<ClassRoom | null> {
  try {
    const db = firestore();

    const queryForClassRoomUID = await db
      .collection('users')
      .doc(userUID)
      .collection('classRooms')
      .get();

    if (queryForClassRoomUID.size === 0) {
      return null;
    }

    let classRoomUID;
    queryForClassRoomUID.forEach((q) => {
      classRoomUID = q.id;
    });

    const snapshot = await db.collection('classRooms').doc(classRoomUID).get();

    const data = snapshot.data();

    if (data) {
      const rtn: ClassRoom = {
        classRoomUID: snapshot.id,
        classRoomName: data.classRoomName,
        accessCode: data.accessCode,
      };

      return rtn;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
