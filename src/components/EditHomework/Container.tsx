import React, {useEffect, useState} from 'react';

import {AssignmentQuestion} from '../../types';
import Layout from './Layout';

export enum LayoutType {
  ADD_HOMEWORK,
  UPDATE_HOMEWORK,
}

function Page(): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(false);

  const [warningTitle, setWarningTitle] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const [description, setDescription] = useState<string>('');

  const [expireDate, setExpireDate] = useState<Date | undefined>();
  const [warningExpireDate, setWarningExpireDate] = useState<string>('');

  const [limitTime, setLimitTime] = useState<string>();
  const [warningLimitTime, setWarningLimitTime] = useState<string>('');

  const [questions, setQuestions] = useState<AssignmentQuestion[]>([
    {
      index: 1,
      question: '',
      answer: '',
    },
  ]);

  const addQuestions = () => {
    setQuestions([
      ...questions,
      {
        index: questions.length + 1,
        question: '',
        answer: '',
      },
    ]);
  };

  const requestSubmit = () => {
    console.log(123);
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

  useEffect(() => {
    console.log(questions);
  }, [questions]);

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

  return (
    <Layout
      layoutType={LayoutType.ADD_HOMEWORK}
      onPressSubmit={requestSubmit}
      loading={loading}
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
    />
  );
}

export default Page;
