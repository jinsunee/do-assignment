import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function signOut() {
  const firebaseAuth = auth();

  await firebaseAuth.signOut();
}

export async function deleteAssignment(
  classRoomsUID: string,
  assignmentUID: string,
): Promise<boolean> {
  try {
    const db = firestore();

    const assignmentRef = db
      .collection('classRooms')
      .doc(classRoomsUID)
      .collection('assignments')
      .doc(assignmentUID);

    const snapshot = await Promise.all([
      await assignmentRef.collection('questions').get(),
      await assignmentRef.collection('answers').get(),
      await assignmentRef.collection('submitList').get(),
    ]);

    snapshot[0].forEach((s) => {
      s.ref.delete();
    });

    snapshot[1].forEach((s) => {
      s.ref.delete();
    });

    const tmp: string[] = [];
    snapshot[2].forEach(async (s) => {
      tmp.push(s.id);
      const answerUID = await assignmentRef
        .collection('submitList')
        .doc(s.id)
        .collection('submitAnswers')
        .get();

      answerUID.forEach((a) => a.ref.delete());
      s.ref.delete();
    });

    await assignmentRef.delete();

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
