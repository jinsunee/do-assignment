import {Assignment, AssignmentQuestion} from '../types';

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
