import {MarkStatus, SubmitAnswersType} from '../../types';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import Layout from './Layout';
import {StackParamList} from '../../navigation/RootStackNavigator';
import {dummySubmitAnswers} from '../../../assets/dummy/submitAnswers';

function Page(): React.ReactElement {
  const route = useRoute<RouteProp<StackParamList, 'HomeworkResult'>>();
  const navigation = useNavigation();
  const {studentUID, studentName, assingmentUID, submitStatus} = route.params;

  const [loading, setLoading] = useState<boolean>(true);

  const [submitTime, setSubmitTime] = useState<Date>();
  const [submitAnswers, setSubmitAnswers] = useState<SubmitAnswersType[]>();

  const changeMarkStatus = (index: number) => {
    console.log(index, submitAnswers);
    if (submitAnswers) {
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

  const fetchItems = () => {
    setLoading(true);

    setSubmitTime(new Date());
    setSubmitAnswers(dummySubmitAnswers);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    console.log(submitAnswers);
  }, [submitAnswers]);

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
