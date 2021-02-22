import {MarkStatus, SubmitAnswersType} from '../../types';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';

import Layout from './Layout';
import {StackParamList} from '../../navigation/RootStackNavigator';
import {fetchSubmitResult} from '../../apis/fetch';
import {updateMarkStatus} from '../../apis/update';

function Page(): React.ReactElement {
  const route = useRoute<RouteProp<StackParamList, 'HomeworkResult'>>();
  const {
    classRoomUID,
    studentUID,
    studentName,
    assignmentUID,
    submitStatus,
    submitTime,
  } = route.params;

  const [loading, setLoading] = useState<boolean>(true);

  const [submitAnswers, setSubmitAnswers] = useState<SubmitAnswersType[]>();

  const changeMarkStatus = async (index: number) => {
    if (submitAnswers) {
      const markStatus =
        submitAnswers[index].markStatus === MarkStatus.CORRECT
          ? MarkStatus.INCORRECT
          : MarkStatus.CORRECT;

      await updateMarkStatus(
        classRoomUID,
        assignmentUID,
        studentUID,
        submitAnswers[index].questionUID,
        markStatus,
      );

      const tmp = [
        ...submitAnswers.slice(0, index),
        {
          ...submitAnswers[index],
          markStatus:
            submitAnswers[index].markStatus === MarkStatus.CORRECT
              ? MarkStatus.INCORRECT
              : MarkStatus.CORRECT,
        },
        ...submitAnswers.slice(index + 1),
      ];

      setSubmitAnswers(tmp);
    }
  };

  const fetchItems = async () => {
    setLoading(true);

    const result = await fetchSubmitResult(
      classRoomUID,
      assignmentUID,
      studentUID,
    );

    if (result) {
      setSubmitAnswers(result);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Layout
      loading={loading}
      studentName={studentName}
      submitStatus={submitStatus}
      submitTime={submitTime}
      submitAnswers={submitAnswers}
      changeMarkStatus={changeMarkStatus}
    />
  );
}

export default Page;
