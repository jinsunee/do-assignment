import {
  Assignment,
  AssignmentQuestion,
  AssignmentStatus,
  ClassRoom,
  MarkStatus,
  StudentSubmitStatus,
  StudentSubmitStatusType,
  SubmitAnswersType,
  UserType,
} from '../types';
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

// 정렬기준: expireDate
export async function fetchAssignmentTeacher(
  classRoomUID: string,
): Promise<Assignment[] | null> {
  try {
    const db = firestore();

    const snapshot = await db
      .collection('classRooms')
      .doc(classRoomUID)
      .collection('assignments')
      .orderBy('expireDate', 'asc')
      .get();

    const rtn: Assignment[] = [];
    snapshot.forEach((s) => {
      const data = s.data();

      rtn.push({
        assignmentUID: s.id,
        title: data.title,
        description: data.description || '',
        expireDate: data.expireDate.toDate(),
        limitTime: data.limitTime,
        status: AssignmentStatus.DEFAULT,
      });
    });

    return rtn || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchQuestions(
  classRoomUID: string,
  assignmentUID: string,
): Promise<SubmitAnswersType[] | null> {
  try {
    const db = firestore();

    const query = await db
      .collection('classRooms')
      .doc(classRoomUID)
      .collection('assignments')
      .doc(assignmentUID)
      .collection('questions')
      .get();

    const rtn: SubmitAnswersType[] = [];
    query.forEach((q) => {
      const data = q.data();

      if (data) {
        rtn.push({
          questionUID: q.id,
          index: data.index,
          question: data.question,
          answer: '',
          submitValue: '',
          markStatus: MarkStatus.INCORRECT,
        });
      }
    });

    return rtn || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchSubmitList(
  classRoomUID: string,
  assignmentUID: string,
): Promise<StudentSubmitStatus[] | null> {
  try {
    const db = firestore();

    // <userUID: string, SubmitStudent: StudentSubmitStatus>
    const map = new Map<string, StudentSubmitStatus>();

    const classRoomRef = db.collection('classRooms').doc(classRoomUID);

    const studentsQuery = await classRoomRef.collection('students').get();

    studentsQuery.forEach((s) => {
      const data = s.data();

      if (data) {
        map.set(s.id, {
          studentUID: s.id,
          studentName: data.userName,
          submitStatus: StudentSubmitStatusType.NOT_YET,
        });
      }
    });

    const rtn: StudentSubmitStatus[] = [];

    for (let s of map.keys()) {
      const submitQuery = await classRoomRef
        .collection('assignments')
        .doc(assignmentUID)
        .collection('submitList')
        .doc(s)
        .get();

      const data = submitQuery.data();

      const mapObject = map.get(s);

      if (mapObject) {
        if (data) {
          rtn.push({
            studentUID: mapObject.studentUID,
            studentName: mapObject.studentName,
            submitStatus: StudentSubmitStatusType.COMPLETED,
            submitTime: data.submitTime.toDate(),
          });
        } else {
          rtn.push(mapObject);
        }
      }
    }

    return rtn || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchQuestionsAnswers(
  classRoomUID: string,
  assignmentUID: string,
): Promise<AssignmentQuestion[] | null> {
  try {
    const db = firestore();

    const assignmentRef = db
      .collection('classRooms')
      .doc(classRoomUID)
      .collection('assignments')
      .doc(assignmentUID);

    const result = await Promise.all([
      await assignmentRef.collection('questions').orderBy('index').get(),
      await assignmentRef.collection('answers').get(),
    ]);

    const questionsRef = result[0];
    const answersRef = result[1];

    const map = new Map<string, AssignmentQuestion>();
    questionsRef.forEach((q) => {
      const data = q.data();

      if (data) {
        map.set(q.id, {
          qustionUID: q.id,
          question: data.question,
          answer: '',
        });
      }
    });

    answersRef.forEach((a) => {
      const data = a.data();

      if (data) {
        map.set(a.id, {
          qustionUID: a.id,
          question: map.get(a.id)?.question || '',
          answer: data.answer,
        });
      }
    });

    const rtn: AssignmentQuestion[] = [];
    map.forEach((m) => rtn.push(m));

    return rtn || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// 정렬기준: expireDate
export async function fetchAssignmentStudent(
  classRoomUID: string,
  studentUID: string,
): Promise<Assignment[] | null> {
  try {
    const db = firestore();

    const snapshot = await db
      .collection('classRooms')
      .doc(classRoomUID)
      .collection('assignments')
      .orderBy('expireDate', 'asc')
      .get();

    const tmp: Assignment[] = [];
    snapshot.forEach((s) => {
      const data = s.data();

      tmp.push({
        assignmentUID: s.id,
        title: data.title,
        description: data.description || '',
        expireDate: data.expireDate.toDate(),
        limitTime: data.limitTime,
        status: AssignmentStatus.DEFAULT,
      });
    });

    const rtn: Assignment[] = [];
    for (let t of tmp) {
      const query = await db
        .collection('classRooms')
        .doc(classRoomUID)
        .collection('assignments')
        .doc(t.assignmentUID)
        .collection('submitList')
        .doc(studentUID)
        .get();

      const data = query.data();

      if (data?.submitTime) {
        rtn.push({
          ...t,
          status: AssignmentStatus.COMPLETED,
          submitTime: data.submitTime.toDate(),
        });
      } else {
        rtn.push({
          ...t,
          status: AssignmentStatus.NOT_YET,
        });
      }
    }

    return rtn || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchSubmitResult(
  classRoomUID: string,
  assignmentUID: string,
  studentUID: string,
): Promise<SubmitAnswersType[] | null> {
  try {
    const db = firestore();

    const snapshot = await db
      .collection('classRooms')
      .doc(classRoomUID)
      .collection('assignments')
      .doc(assignmentUID)
      .collection('submitList')
      .doc(studentUID)
      .collection('submitAnswers')
      .orderBy('index')
      .get();

    const rtn: SubmitAnswersType[] = [];

    snapshot.forEach((s) => {
      const data = s.data();

      if (data) {
        rtn.push({
          questionUID: s.id,
          index: data.index,
          question: data.question,
          answer: data.answer,
          submitValue: data.submitValue,
          markStatus: data.markStatus,
        });
      }
    });

    return rtn || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function validateAccessCode(accessCode: string): Promise<boolean> {
  try {
    const snapshot = await firestore()
      .collection('classRooms')
      .where('accessCode', '==', accessCode)
      .get();

    return snapshot.size <= 0;
  } catch (error) {
    console.log(error);
    return false;
  }
}
