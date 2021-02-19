import {AssignmentQuestion, StudentSubmitStatus} from '../../types';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {fetchQuestionsAnswers, fetchSubmitList} from '../../apis/fetch';

import Layout from './Layout';
import {StackParamList} from '../../navigation/RootStackNavigator';
import {deleteAssignment} from '../../apis/delete';
import useAssignment from '../../hooks/useAssignment';
import useClassRoom from '../../hooks/useClassRoom';

export enum RenderListType {
  SUBMIT_STATUS = '제출현황',
  QUESTIONS = '문제',
}

function Page(): React.ReactElement {
  const route = useRoute<RouteProp<StackParamList, 'TeacherHomeworkDetail'>>();
  const {classRoom} = useClassRoom();
  const {assignment, setAssignments} = useAssignment();
  const navigation = useNavigation();

  const {
    assignment: {assignmentUID, title, expireDate, description},
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

  const [loading, setLoading] = useState<boolean>(false);

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

  const fetchSubmitStatusItems = async () => {
    setLoadingSubmitStatusItems(true);

    const result = await fetchSubmitList(
      classRoom?.classRoomUID || '',
      assignmentUID,
    );

    if (result) {
      setSubmitStatusItems(result);
    }

    setLoadingSubmitStatusItems(false);
  };

  const fetchQuestions = async () => {
    setLoadingQuestionList(true);

    const result = await fetchQuestionsAnswers(
      classRoom?.classRoomUID || '',
      assignmentUID,
    );

    if (result) {
      setQuestionList(result);
    }

    setLoadingQuestionList(false);
  };

  useEffect(() => {
    fetchSubmitStatusItems();
  }, []);

  const handleModal = (): void => {
    setShownModal((prev) => !prev);
  };

  const onPressEdit = () => {
    setShownModal(false);

    navigation.navigate('EditHomework', {
      assignment: route.params.assignment,
      questions: questionList,
    });
  };

  const onPressRemove = async () => {
    if (classRoom?.classRoomUID && assignment) {
      setLoading(true);
      setShownModal(false);
      const result = await deleteAssignment(
        classRoom.classRoomUID,
        assignmentUID,
      );

      if (result) {
        const newAssignments = assignment.filter(
          (a) => a.assignmentUID !== assignmentUID,
        );
        setAssignments(newAssignments);
        navigation.goBack();
      }
      setLoading(false);
    }
  };

  return (
    <Layout
      loading={loading}
      title={title}
      date={expireDate}
      description={description || ''}
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
      classRoomUID={classRoom?.classRoomUID || ''}
      assignmentUID={assignmentUID}
    />
  );
}

export default Page;
