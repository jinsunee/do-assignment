import {
  AssignmentQuestion,
  AssignmentStatus,
  StudentSubmitStatus,
  StudentSubmitStatusType,
} from '../../types';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import Layout from './Layout';
import {StackParamList} from '../../navigation/RootStackNavigator';
import {questions as dummyQuestions} from '../../../assets/dummy/questions';
import {submitStatusItems as dummySubmit} from '../../../assets/dummy/submitStatusItems';

export enum RenderListType {
  SUBMIT_STATUS = '제출현황',
  QUESTIONS = '문제',
}

function Page(): React.ReactElement {
  const route = useRoute<RouteProp<StackParamList, 'TeacherHomeworkDetail'>>();
  const navigation = useNavigation();
  const {
    assignmentItem: {title, date, description},
  } = route.params;

  const [renderListType, setRenderListType] = useState<RenderListType>(
    RenderListType.SUBMIT_STATUS,
  );

  const [shownModal, setShownModal] = useState<boolean>(false);

  // 제출현황
  const [
    loadingSubmitStatusItems,
    setLoadingSubmitStatusItems,
  ] = useState<boolean>(false);
  const [submitStatusItems, setSubmitStatusItems] = useState<
    StudentSubmitStatus[]
  >();

  // 문제
  const [loadingQuestionList, setLoadingQuestionList] = useState<boolean>(
    false,
  );
  const [questionList, setQuestionList] = useState<AssignmentQuestion[]>();

  const onPressMenuItem = (input: RenderListType) => {
    setRenderListType(input);

    if (input === RenderListType.QUESTIONS && !questionList) {
      fetchQuestions();
      return;
    }

    if (input === RenderListType.SUBMIT_STATUS && !submitStatusItems) {
      fetchSubmitStatusItems();
    }
  };

  const goToHomeworkResult = (
    studentUID: string,
    studentName: string,
    assignmentUID: string,
    submitStatus: StudentSubmitStatusType,
  ) => {
    if (navigation) {
      navigation.navigate('HomeworkResult', {
        studentUID,
        studentName,
        assignmentUID,
        submitStatus,
      });
    }
  };

  const fetchSubmitStatusItems = () => {
    setLoadingSubmitStatusItems(true);

    const tmp = dummySubmit.map((item) => {
      const {studentUID, studentName, submitStatus} = item;
      return {
        ...item,
        onPressElement: () =>
          goToHomeworkResult(studentUID, studentName, '123', submitStatus),
      };
    });

    setSubmitStatusItems(tmp);

    setTimeout(() => {
      setLoadingSubmitStatusItems(false);
    }, 2000);
  };

  const fetchQuestions = () => {
    setLoadingQuestionList(true);

    setTimeout(() => {
      setQuestionList(dummyQuestions);
      setLoadingQuestionList(false);
    }, 2000);
  };

  useEffect(() => {
    fetchSubmitStatusItems();
  }, []);

  const handleModal = (): void => {
    setShownModal((prev) => !prev);
  };

  const onPressEdit = () => console.log(123);
  const onPressRemove = () => console.log(123);

  return (
    <Layout
      title={title}
      date={date}
      description={description || '121312'}
      renderListType={renderListType}
      onPressMenuItem={onPressMenuItem}
      loadingSubmitStatusItems={loadingSubmitStatusItems}
      submitStatusItems={submitStatusItems}
      loadingQuestionList={loadingQuestionList}
      questionList={questionList}
      shownModal={shownModal}
      handleModal={handleModal}
      onPressEdit={onPressEdit}
      onPressRemove={onPressRemove}
    />
  );
}

export default Page;
