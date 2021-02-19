import {ActivityIndicator, Alert} from 'react-native';
import {Assignment, SubmitAnswersType} from '../../types';
import {BoldText, TextInputBox} from '../../shared';
import React, {useEffect, useState} from 'react';

import KeyboardWrapper from '../../shared/KeyboardWrapper';
import {colors} from '../../utils/theme';
import {millisToHoursAndMinutesAndSeconds} from '../../utils/common';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  assignment: Assignment;
  submitList: SubmitAnswersType[];
  loading: boolean;
  onPressSubmit: () => void;
  goToStudentMain: () => void;
  onChangeAnswer: (index: number, value: string) => void;
}

function Layout(props: Props): React.ReactElement {
  const {
    assignment: {limitTime},
    submitList,
    loading,
    onPressSubmit,
    goToStudentMain,
    onChangeAnswer,
  } = props;
  const insets = useSafeAreaInsets();

  const [restTime, setRestTime] = useState<string>('');

  // const로 입장시간부터 입력받는다.
  const endTimeMilli = (parseInt(limitTime) - 1) * 60000 + Date.now();

  useEffect(() => {
    setInterval(() => {
      setRestTime(millisToHoursAndMinutesAndSeconds(endTimeMilli - Date.now()));
    }, 1000);
  }, []);

  useEffect(() => {
    if (restTime === '00:00:00') {
      Alert.alert('시험이 종료되었습니다.');
      goToStudentMain();
    }
  }, [restTime]);

  const renderAnswers = (): React.ReactElement[] => {
    return submitList.map((item, index) => {
      const {questionUID, submitValue, question} = item;
      return (
        <QuestionWrapper>
          <QuestionNumber>{index + 1}번</QuestionNumber>
          <TextInputBox
            key={questionUID}
            title={question}
            textInputProps={{
              value: submitValue,
              onChangeText: (text: string) => onChangeAnswer(index, text),
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
            제출까지 <BoldText>{restTime} </BoldText> 남음
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
