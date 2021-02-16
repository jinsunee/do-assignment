import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {Alert} from 'react-native';
import {AnswerType} from '../../types';
import Layout from './Layout';

function Page(): React.ReactElement {
  const navigation = useNavigation();

  const limitTime = 30;

  const [answers, setAnswers] = useState<AnswerType[]>([
    {
      assignmentUID: '123',
      index: 1,
      question: '문제 입니다',
      answer: '',
    },
    {
      assignmentUID: '123',
      index: 1,
      question: '문제 입니다',
      answer: '',
    },
    {
      assignmentUID: '123',
      index: 1,
      question: '문제 입니다',
      answer: '',
    },
    {
      assignmentUID: '123',
      index: 1,
      question: '문제 입니다',
      answer: '',
    },
    {
      assignmentUID: '123',
      index: 1,
      question: '문제 입니다',
      answer: '',
    },
    {
      assignmentUID: '123',
      index: 1,
      question: '문제 입니다',
      answer: '',
    },
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  const requestSubmit = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'StudentMain'}],
      }),
    );
  };

  const pressSubmitAnswers = async () => {
    const isFilledAll = answers?.some((a) => a.answer === '');

    if (isFilledAll) {
      Alert.alert(
        '확인해줘요',
        '답변이 전부 입력되지 않았어요! 그래도 제출할까요?',
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {text: '제출할래요', onPress: requestSubmit},
        ],
        {cancelable: false},
      );
      return;
    }

    Alert.alert(
      '과제 제출',
      '과제를 제출할까요?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {text: '제출할래요!', onPress: requestSubmit},
      ],
      {cancelable: false},
    );
  };

  return (
    <Layout
      limitTime={limitTime}
      answers={answers}
      setAnswers={setAnswers}
      loading={loading}
      onPressSubmit={pressSubmitAnswers}
    />
  );
}

export default Page;
