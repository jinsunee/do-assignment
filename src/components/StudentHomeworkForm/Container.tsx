import React, {useEffect, useState} from 'react';

import {AnswerType} from '../../types';
import Layout from './Layout';

function Page(): React.ReactElement {
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

  const requestSubmit = () => console.log(123);

  return (
    <Layout
      limitTime={limitTime}
      answers={answers}
      setAnswers={setAnswers}
      loading={loading}
      onPressSubmit={requestSubmit}
    />
  );
}

export default Page;
