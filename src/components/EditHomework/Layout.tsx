import {AssignmentQuestion, HeaderElementType} from '../../types';

import DatePicker from './DatePicker';
import Header from '../../shared/Header';
import {KeyboardWrapper} from '../../shared';
import {LayoutType} from './Container';
import QuestionItem from './QuestionItem';
import React from 'react';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';

interface Props {
  layoutType: LayoutType;
  loading: boolean;
  title: string;
  setTitle: (input: string) => void;
  warningTitle: string;
  description: string;
  setDescription: (input: string) => void;
  warningDescription: string;
  expireDate: Date | undefined;
  setExpireDate: (input: Date) => void;
  warningExpireDate: string;
  questions: AssignmentQuestion[];
  onChangeQuestion: (index: number, text: string) => void;
  onChangeAnswer: (index: number, text: string) => void;
  onPressSubmit: () => void;
}

enum QuestionItemInput {
  QUESTION,
  ANSWER,
}

function Layout(props: Props): React.ReactElement {
  const {
    layoutType,
    loading,
    title,
    setTitle,
    warningTitle,
    description,
    setDescription,
    warningDescription,
    expireDate,
    setExpireDate,
    warningExpireDate,
    questions,
    onChangeQuestion,
    onChangeAnswer,
    onPressSubmit,
  } = props;

  const rightElements: HeaderElementType[] = [
    {
      key: 'filter button',
      element: <SubmitText>저장</SubmitText>,
      onPressElement: onPressSubmit,
    },
  ];

  const renderQuestions = (): React.ReactElement[] => {
    return questions?.map(({index, question, answer}, ind) => (
      <QuestionItem
        index={index}
        question={question}
        answer={answer}
        onChangeTextQuestion={(text) => onChangeQuestion(ind, text)}
        onChangeTextAnswer={(text) => onChangeAnswer(ind, text)}
      />
    ));
  };

  return (
    <Container>
      <Header rightElements={rightElements} />
      <KeyboardWrapper>
        <Wrapper>
          <TitleWrapper>
            <Title>과제 추가</Title>
          </TitleWrapper>
          <AssignmentTitleInput
            value={title}
            onChangeText={setTitle}
            placeholder={'제목을 입력해주세요.'}
            placeholderTextColor={colors.blueGray[0]}
          />
          <DescriptionInput
            value={description}
            onChangeText={setDescription}
            placeholder={'설명을 입력해주세요.'}
            placeholderTextColor={colors.blueGray[0]}
          />
          <DatePicker expireDate={expireDate} setExpireDate={setExpireDate} />
          {renderQuestions()}
        </Wrapper>
      </KeyboardWrapper>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const Wrapper = styled.ScrollView`
  padding: 5px 15px;
`;

const TitleWrapper = styled.View`
  padding: 10px 0 20px 0;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${({theme}) => theme.font};
`;

const SubmitText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${({theme}) => theme.primary};
`;

const AssignmentTitleInput = styled.TextInput`
  font-weight: bold;
  font-size: 22px;
  color: ${({theme}) => theme.font};
  padding: 10px 0;
`;

const DescriptionInput = styled.TextInput`
  font-weight: bold;
  font-size: 16px;
  color: ${({theme}) => theme.font};
  padding: 5px 0;
`;

export default Layout;
