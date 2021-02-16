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
    {
      index: 2,
      question: '',
      answer: '',
    },
  ]);

  const requestSubmit = () => {
    console.log(123);
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
      setQuestions={setQuestions}
    />
  );
}

export default Page;
