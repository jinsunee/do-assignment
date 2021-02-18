import {UserType} from '../types';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const firebaseAuth = auth();

export async function signUpEmail(
  email: string,
  password: string,
): Promise<string> {
  try {
    const result = await firebaseAuth.createUserWithEmailAndPassword(
      email,
      password,
    );

    const currentUser = firebaseAuth.currentUser;

    if (result && currentUser) {
      await currentUser.sendEmailVerification();

      return result.user?.uid || '';
    }

    return '';
  } catch (error) {
    console.log(error);
    return '';
  }
}

export async function insertTeacher(
  userUID: string,
  userName: string,
  email: string,
  classRoomName: string,
  accessCode: string,
): Promise<string> {
  try {
    const db = firestore();
    const currentUser = firebaseAuth.currentUser;

    if (currentUser) {
      const userRef = db.collection('users').doc(userUID);
      const createdAt = firestore.Timestamp.fromDate(new Date());

      const snapshot = await Promise.all([
        await userRef.set({
          userType: UserType.TEACHER,
          userName,
          email,
          createdAt,
        }),
        await db.collection('classRooms').add({
          accessCode,
          classRoomName,
          teacherUID: userUID,
          teacherName: userName,
          createdAt,
        }),
        await currentUser.updateProfile({
          displayName: userName,
        }),
      ]);

      const classRoomUID = snapshot[1].id;

      if (classRoomUID) {
        await userRef.collection('classRooms').doc(classRoomUID).set({
          createdAt,
        });
        return classRoomUID;
      }
    }

    return '';
  } catch (error) {
    console.log(error);
    return '';
  }
}

export async function insertStudent(
  classRoomUID: string,
  userName: string,
): Promise<string> {
  try {
    const currentUser = auth().currentUser;
    const db = firestore();

    if (currentUser) {
      const userRef = db.collection('users').doc(currentUser.uid);
      const createdAt = firestore.Timestamp.fromDate(new Date());

      await Promise.all([
        await userRef.set({
          userType: UserType.STUDENT,
          userName,
          email: currentUser.email,
          createdAt,
        }),
        await userRef.collection('classRooms').doc(classRoomUID).set({
          createdAt,
        }),
        await db
          .collection('classRooms')
          .doc(classRoomUID)
          .collection('students')
          .doc(currentUser.uid)
          .set({
            userName,
            createdAt,
          }),
        await currentUser.updateProfile({
          displayName: userName,
        }),
      ]);
    }

    return 'success';
  } catch (error) {
    console.log(error);
    return '';
  }
}
