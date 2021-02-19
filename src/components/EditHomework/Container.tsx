import {AssignmentQuestion, AssignmentStatus} from '../../types';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {Alert} from 'react-native';
import Layout from './Layout';
import {StackParamList} from '../../navigation/RootStackNavigator';
import {fetchQuestionsAnswers} from '../../apis/fetch';
import {insertAssignment} from '../../apis/insert';
import {updateAssignment} from '../../apis/update';
import useAssignment from '../../hooks/useAssignment';
import useClassRoom from '../../hooks/useClassRoom';

export enum LayoutType {
  ADD_HOMEWORK,
  UPDATE_HOMEWORK,
}

function Page(): React.ReactElement {
  const route = useRoute<RouteProp<StackParamList, 'EditHomework'>>();
  const navigation = useNavigation();

  const {classRoom} = useClassRoom();
  const {assignment, setAssignments} = useAssignment();

  const [loading, setLoading] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [expireDate, setExpireDate] = useState<Date | undefined>();
  const [limitTime, setLimitTime] = useState<string>('');
  const [questions, setQuestions] = useState<AssignmentQuestion[]>([
    {
      qustionUID: '1',
      question: '',
      answer: '',
    },
  ]);

  const [warningTitle, setWarningTitle] = useState<string>('');
  const [warningExpireDate, setWarningExpireDate] = useState<string>('');
  const [warningLimitTime, setWarningLimitTime] = useState<string>('');

  useEffect(() => {
    if (route?.params?.assignment) {
      fetch();
    }
  }, []);

  const fetch = async () => {
    setLoading(true);

    if (route?.params?.questions) {
      setQuestions(route.params.questions);
    } else {
      const result = await fetchQuestionsAnswers(
        classRoom?.classRoomUID || '',
        route?.params?.assignment?.assignmentUID || '',
      );

      if (result) {
        setQuestions(result);
      }
    }

    if (route.params.assignment) {
      setTitle(route.params.assignment.title);
      setDescription(route.params.assignment.description || '');
      setExpireDate(route.params.assignment.expireDate);
      setLimitTime(route.params.assignment.limitTime.toString());
    }

    setLoading(false);
  };

  const addQuestions = () => {
    setQuestions([
      ...questions,
      {
        qustionUID: '',
        question: '',
        answer: '',
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length <= 1) {
      return;
    }

    setQuestions([...questions.slice(0, index), ...questions.slice(index + 1)]);
  };

  const _onChangeQuestion = (index: number, text: string) => {
    setQuestions((prev) => [
      ...prev.slice(0, index),
      {
        ...prev[index],
        question: text,
      },
      ...prev.slice(index + 1),
    ]);
  };

  const _onChangeAnswer = (index: number, text: string) => {
    setQuestions((prev) => [
      ...prev.slice(0, index),
      {
        ...prev[index],
        answer: text,
      },
      ...prev.slice(index + 1),
    ]);
  };

  const requestAddAssignment = async () => {
    setLoading(true);
    if (!title) {
      setWarningTitle('no empty');
      setLoading(false);
      return;
    }

    if (!expireDate) {
      setWarningExpireDate('no empty');
      setLoading(false);
      return;
    }

    if (!limitTime) {
      setWarningLimitTime('no empty');
      setLoading(false);
      return;
    }

    // 문제는 전부 채워줘야한다.
    if (questions.some((q) => q.question === '')) {
      Alert.alert('문제를 전부 채워주세요 :)');
      setLoading(false);
      return;
    }

    if (questions.some((q) => q.answer === '')) {
      Alert.alert('답를 전부 채워주세요 :)');
      setLoading(false);
      return;
    }

    const result = await insertAssignment(
      classRoom?.classRoomUID || '',
      title,
      description,
      expireDate,
      limitTime,
      questions,
    );

    if (result) {
      if (assignment) {
        setAssignments([
          ...assignment,
          {
            assignmentUID: result,
            title,
            description,
            expireDate,
            limitTime,
            status: AssignmentStatus.DEFAULT,
          },
        ]);
      } else {
        setAssignments([
          {
            assignmentUID: result,
            title,
            description,
            expireDate,
            limitTime,
            status: AssignmentStatus.DEFAULT,
          },
        ]);
      }
    }
    setLoading(false);

    navigation.goBack();
  };

  const requestUpdateAssignment = async () => {
    setLoading(true);
    if (!title) {
      setWarningTitle('no empty');
      setLoading(false);
      return;
    }

    if (!expireDate) {
      setWarningExpireDate('no empty');
      setLoading(false);
      return;
    }

    if (!limitTime) {
      setWarningLimitTime('no empty');
      setLoading(false);
      return;
    }

    // 문제는 전부 채워줘야한다.
    if (questions.some((q) => q.question === '')) {
      Alert.alert('문제를 전부 채워주세요 :)');
      setLoading(false);
      return;
    }

    if (questions.some((q) => q.answer === '')) {
      Alert.alert('답를 전부 채워주세요 :)');
      setLoading(false);
      return;
    }

    const assignmentUID = route?.params.assignment?.assignmentUID || '';

    const result = await updateAssignment(
      classRoom?.classRoomUID || '',
      {
        title,
        expireDate,
        description,
        limitTime,
        assignmentUID,
        status: AssignmentStatus.DEFAULT,
      },
      questions,
    );

    if (result && assignment) {
      const index = assignment.findIndex(
        (a) => a.assignmentUID === assignmentUID,
      );

      setAssignments([
        ...assignment.slice(0, index),
        {
          title,
          expireDate,
          description,
          limitTime,
          assignmentUID,
          status: AssignmentStatus.DEFAULT,
        },
        ...assignment.slice(index + 1),
      ]);
    }
    setLoading(false);

    navigation.goBack();
  };

  if (route?.params?.assignment) {
    return (
      <Layout
        loading={loading}
        layoutType={LayoutType.UPDATE_HOMEWORK}
        onPressSubmit={requestUpdateAssignment}
        title={title}
        setTitle={setTitle}
        warningTitle={warningTitle}
        description={description}
        setDescription={setDescription}
        expireDate={expireDate}
        setExpireDate={setExpireDate}
        warningExpireDate={warningExpireDate}
        limitTime={limitTime}
        setLimitTime={setLimitTime}
        warningLimitTime={warningLimitTime}
        questions={questions}
        onChangeQuestion={_onChangeQuestion}
        onChangeAnswer={_onChangeAnswer}
        addQuestions={addQuestions}
        removeQuestion={removeQuestion}
      />
    );
  }

  return (
    <Layout
      loading={loading}
      layoutType={LayoutType.ADD_HOMEWORK}
      onPressSubmit={requestAddAssignment}
      title={title}
      setTitle={setTitle}
      warningTitle={warningTitle}
      description={description}
      setDescription={setDescription}
      expireDate={expireDate}
      setExpireDate={setExpireDate}
      warningExpireDate={warningExpireDate}
      limitTime={limitTime}
      setLimitTime={setLimitTime}
      warningLimitTime={warningLimitTime}
      questions={questions}
      onChangeQuestion={_onChangeQuestion}
      onChangeAnswer={_onChangeAnswer}
      addQuestions={addQuestions}
      removeQuestion={removeQuestion}
    />
  );
}

export default Page;
