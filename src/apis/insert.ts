import {
  AssignmentQuestion,
  MarkStatus,
  SubmitAnswersType,
  UserType,
} from '../types';

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

export async function insertAssignment(
  classRoomUID: string,
  title: string,
  description?: string,
  // @ts-ignore
  expireDate: Date,
  limitTime: string,
  questions: AssignmentQuestion[],
): Promise<string> {
  try {
    const db = firestore();
    const assignmentRef = db
      .collection('classRooms')
      .doc(classRoomUID)
      .collection('assignments');

    const insertAssignmentObject = description
      ? {
          title,
          description,
          expireDate: expireDate,
          limitTime: parseInt(limitTime),
        }
      : {
          title,
          expireDate: expireDate,
          limitTime: parseInt(limitTime),
        };

    const snapshot = await assignmentRef.add(insertAssignmentObject);

    if (snapshot) {
      questions.forEach(async (q, index) => {
        await Promise.all([
          await assignmentRef
            .doc(snapshot.id)
            .collection('questions')
            .doc(index.toString())
            .set({
              index,
              question: q.question,
            }),
          await assignmentRef
            .doc(snapshot.id)
            .collection('answers')
            .doc(index.toString())
            .set({
              answer: q.answer,
            }),
        ]);
      });

      return snapshot.id;
    }

    return '';
  } catch (error) {
    console.log(error);
    return '';
  }
}

export async function insertStartAssignment(
  classRoomUID: string,
  assignmentUID: string,
  studentUID: string,
  studentName: string,
): Promise<boolean> {
  try {
    const db = firestore();

    const startAt = firestore.Timestamp.fromDate(new Date());

    await db
      .collection('classRooms')
      .doc(classRoomUID)
      .collection('assignments')
      .doc(assignmentUID)
      .collection('submitList')
      .doc(studentUID)
      .set({
        userName: studentName,
        startAt,
      });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function insertSubmitAnswers(
  classRoomUID: string,
  assignmentUID: string,
  studentUID: string,
  submitList: SubmitAnswersType[],
): Promise<boolean> {
  try {
    // console.log('submitList', submitList);
    const db = firestore();

    const submitTime = firestore.Timestamp.fromDate(new Date());

    const assignmentRef = db
      .collection('classRooms')
      .doc(classRoomUID)
      .collection('assignments')
      .doc(assignmentUID);

    await assignmentRef.collection('submitList').doc(studentUID).update({
      submitTime,
    });

    for (let s of submitList) {
      const snapshot = await assignmentRef
        .collection('answers')
        .doc(s.questionUID)
        .get();

      const data = snapshot.data();
      if (data) {
        await assignmentRef
          .collection('submitList')
          .doc(studentUID)
          .collection('submitAnswers')
          .doc(s.questionUID)
          .set({
            index: s.index,
            question: s.question,
            answer: data.answer,
            submitValue: s.submitValue,
            markStatus:
              s.submitValue === data.answer
                ? MarkStatus.CORRECT
                : MarkStatus.INCORRECT,
          });
      }
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
