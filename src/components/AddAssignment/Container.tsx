import React, {useState} from 'react';

import {AnswerType} from '../../types';
import Layout from './Layout';

function Page(): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(false);

  const [warningTitle, setWarningTitle] = useState<string>();
  const [title, setTitle] = useState<string>();

  const [description, setDescription] = useState<string>();
  const [warningDescription, setWarningDescription] = useState<string>();

  const [expireDate, setExpireDate] = useState<Date>();
  const [warningExpireDate, setWarningExpireDate] = useState<string>();

  const [answers, setAnswers] = useState<AnswerType[]>([
    {
      index: 1,
      problemTitle: '1',
      answer: '',
    },
  ]);

  const requestSubmit = () => {
    console.log(123);
  };

  return (
    <Layout
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
      answers={answers}
      setAnswers={setAnswers}
    />
  );
}

export default Page;
