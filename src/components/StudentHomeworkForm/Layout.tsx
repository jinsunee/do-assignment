import {BoldText, TextInputBox} from '../../shared';
import React, {useState} from 'react';

import {ActivityIndicator} from 'react-native';
import {AnswerType} from '../../types';
import KeyboardWrapper from '../../shared/KeyboardWrapper';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  limitTime: number;
  answers: AnswerType[];
  setAnswers: (input: AnswerType[]) => void;
  loading: boolean;
  onPressSubmit: () => void;
}

function Layout(props: Props): React.ReactElement {
  const {limitTime, answers, setAnswers, loading, onPressSubmit} = props;
  const insets = useSafeAreaInsets();
  const [restTime, setRestTime] = useState<number>(limitTime - 20);

  const _onChangeAnswer = (index: number, value: string) => {
    const tmpArr = [
      ...answers.slice(0, index),
      {
        ...answers[index],
        answer: value,
      },
      ...answers.slice(index + 1),
    ];

    setAnswers(tmpArr);
  };

  const renderAnswers = (): React.ReactElement[] => {
    return answers.map((item, index) => {
      const {assignmentUID, answer, question} = item;
      return (
        <QuestionWrapper>
          <QuestionNumber>{index + 1}</QuestionNumber>
          <TextInputBox
            key={assignmentUID}
            title={question}
            textInputProps={{
              value: answer,
              onChangeText: (text: string) => _onChangeAnswer(index, text),
              placeholder: '답을 입력해주세요.',
            }}
          />
        </QuestionWrapper>
      );
    });
  };

  const renderSubmitButton = (): React.ReactElement => {
    if (loading) {
      return (
        <SubmitButton disabled={loading}>
          <ActivityIndicator size={16} color={colors.light} />
        </SubmitButton>
      );
    }

    return (
      <SubmitButton onPress={onPressSubmit}>
        <SubmitText>제출하기</SubmitText>
      </SubmitButton>
    );
  };

  return (
    <Container>
      <TopWrapper style={{paddingTop: insets.top + 15}}>
        <TimeButton>
          <TimeText>
            제출까지 <BoldText>{restTime}:01</BoldText> 남음
          </TimeText>
        </TimeButton>
        <Title>제목제목</Title>
        <Description>설명입니다 설명설명</Description>
      </TopWrapper>
      <KeyboardWrapper>
        <Wrapper bottom={insets.bottom}>
          {renderAnswers()}
          {renderSubmitButton()}
        </Wrapper>
      </KeyboardWrapper>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const TopWrapper = styled.View`
  padding: 15px;
  background-color: ${({theme}) => theme.primary};
`;

const TimeButton = styled.TouchableOpacity`
  align-self: flex-end;
`;

const TimeText = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.background};
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 30px;
  color: ${({theme}) => theme.background};
  margin: 20px 0 10px 0;
`;

const Description = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.background};
  line-height: 25px;
  margin-bottom: 5px;
`;

const Wrapper = styled.ScrollView<{
  bottom: number;
}>`
  margin: 35px 0;
  padding: 15px 15px 0 15px;
`;

const QuestionWrapper = styled.View`
  background-color: ${({theme}) => theme.background};
  box-shadow: 0px 0px 4px #e0e0e0;
  padding: 15px 15px 0 15px;
  justify-content: center;
  margin-bottom: 15px;
`;

const QuestionNumber = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${colors.gray[2]};
  margin-bottom: 5px;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 90px;
  height: 50px;
  background-color: ${({theme}) => theme.primary};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  align-self: flex-end;
`;

const SubmitText = styled.Text`
  color: ${({theme}) => theme.background};
  font-weight: bold;
  font-size: 16px;
`;

export default Layout;
