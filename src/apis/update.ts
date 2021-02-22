import {Assignment, AssignmentQuestion, MarkStatus} from '../types';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function updateAssignment(
  classRoomUID: string,
  assignment: Assignment,
  questions: AssignmentQuestion[],
): Promise<boolean> {
  try {
    const db = firestore();

    const {
      assignmentUID,
      title,
      description,
      expireDate,
      limitTime,
    } = assignment;

    const assignmentRef = db
      .collection('classRooms')
      .doc(classRoomUID)
      .collection('assignments')
      .doc(assignmentUID);

    if (description) {
      await assignmentRef.update({
        title,
        description,
        expireDate: firestore.Timestamp.fromDate(expireDate),
        limitTime,
      });
    } else {
      await assignmentRef.update({
        title,
        expireDate: firestore.Timestamp.fromDate(expireDate),
        limitTime,
      });
    }

    questions.forEach(async (q) => {
      await Promise.all([
        await assignmentRef.collection('questions').doc(q.qustionUID).delete(),
        await assignmentRef.collection('answers').doc(q.qustionUID).delete(),
      ]);
    });

    questions.forEach(async (q, index) => {
      await Promise.all([
        await assignmentRef.collection('questions').doc(q.qustionUID).set({
          index,
          question: q.question,
        }),
        await assignmentRef.collection('answers').doc(q.qustionUID).set({
          answer: q.answer,
        }),
      ]);
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateMarkStatus(
  classRoomUID: string,
  assignmentUID: string,
  studentUID: string,
  submitAnswerUID: string,
  markStatus: MarkStatus,
): Promise<boolean> {
  try {
    await firestore()
      .collection('classRooms')
      .doc(classRoomUID)
      .collection('assignments')
      .doc(assignmentUID)
      .collection('submitList')
      .doc(studentUID)
      .collection('submitAnswers')
      .doc(submitAnswerUID)
      .update({
        markStatus,
      });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// upate class Room information
export async function updateClassRoomInformation(
  classRoomUID: string,
  classRoomName: string,
  accessCode: string,
): Promise<boolean> {
  try {
    await firestore().collection('classRooms').doc(classRoomUID).update({
      classRoomName,
      accessCode,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// update user information
export async function updateUserInformation(
  userUID: string,
  userName: string,
): Promise<boolean> {
  try {
    const currentUser = auth().currentUser;

    if (currentUser) {
      await Promise.all([
        await currentUser.updateProfile({
          displayName: userName,
        }),
        await firestore().collection('users').doc(userUID).update({
          userName,
        }),
      ]);
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
