import React, {useState} from 'react';

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
  const [warningDescription, setWarningDescription] = useState<string>('');

  const [expireDate, setExpireDate] = useState<Date | undefined>();
  const [warningExpireDate, setWarningExpireDate] = useState<string>('');

  const [questions, setQuestions] = useState<AssignmentQuestion[]>([
    {
      index: 1,
      question: '',
      answer: '',
    },
  ]);

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
      warningDescription={warningDescription}
      expireDate={expireDate}
      setExpireDate={setExpireDate}
      warningExpireDate={warningExpireDate}
      questions={questions}
      onChangeQuestion={_onChangeQuestion}
      onChangeAnswer={_onChangeAnswer}
    />
  );
}

export default Page;
