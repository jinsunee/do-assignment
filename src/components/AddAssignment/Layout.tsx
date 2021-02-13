import {AnswerType} from '../../types';
import {DatePicker} from '../../shared';
import Header from '../../shared/Header';
import {HeaderElementType} from '../../types';
import {KeyboardWrapper} from '../../shared';
import React from 'react';
import {SvgPlus} from '../../utils/Icons';
import TextInputBox from '../../shared/TextInputBox';
import styled from '@emotion/native';
import useTheme from '../../hooks/useTheme';

interface Props {
  loading: boolean;
  title: string;
  setTitle: (input: string) => void;
  warningTitle: string;
  description: string;
  setDescription: (input: string) => void;
  warningDescription: string;
  expireDate: Date;
  setExpireDate: (input: Date) => void;
  warningExpireDate: string;
  answers: AnswerType[];
  setAnswers: (input: AnswerType[]) => void;
  onPressSubmit: () => void;
}

function Layout(props: Props): React.ReactElement {
  const {
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
    answers,
    setAnswers,
    onPressSubmit,
  } = props;

  const {theme} = useTheme();

  const rightElements: HeaderElementType[] = [
    {
      key: 'filter button',
      element: <SubmitText>완료</SubmitText>,
      onPressElement: onPressSubmit,
    },
  ];

  const addProblem = (): void => {
    setAnswers((prev) =>
      prev.concat({
        index: prev.length + 1,
        problemTitle: (prev.length + 1).toString(),
        answer: '',
      }),
    );
  };

  const _onChangeText = (text: string, index: number) => {
    setAnswers((prev) => [
      ...prev.slice(0, index),
      {
        index,
        problemTitle: index,
        answer: text,
      },
      ...prev.slice(index + 1),
    ]);
  };

  const renderAnswerInputList = (): React.ReactElement[] | undefined => {
    return answers?.map(
      (a, index): React.ReactElement => (
        <TextInputBox
          key={a.problemTitle}
          title={a.problemTitle + '번'}
          textInputProps={{
            value: title,
            onChangeText: (text) => {
              _onChangeText(text, index);
            },
            placeholder: '숫자만 입력가능해요.',
          }}
          warningText={warningTitle}
        />
      ),
    );
  };

  return (
    <Container>
      <Header rightElements={rightElements} />
      <KeyboardWrapper>
        <Wrapper>
          <TitleWrapper>
            <Title>과제 추가</Title>
          </TitleWrapper>
          <TextInputBox
            title={'제목'}
            textInputProps={{
              value: title,
              onChangeText: setTitle,
              placeholder: '제목을 입력해주세요.',
            }}
            warningText={warningTitle}
          />
          <TextInputBox
            title={'과제 설명'}
            textInputProps={{
              value: description,
              onChangeText: setDescription,
              placeholder: '설명을 입력해주세요.',
            }}
            warningText={warningDescription}
          />
          <DatePicker
            title="언제까지 제출해야하나요?"
            expireDate={expireDate}
            setExpireDate={setExpireDate}
            warningExpireDate={warningExpireDate}
          />
          <TitleWrapper>
            <Title>문제</Title>
          </TitleWrapper>
          {renderAnswerInputList()}
          <AddButton onPress={addProblem}>
            <SvgPlus fill={theme.primary} />
            <AddButtonText>문제 추가</AddButtonText>
          </AddButton>
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

const SubmitText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${({theme}) => theme.primary};
`;

const TitleWrapper = styled.View`
  padding: 10px 0 20px 0;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${({theme}) => theme.font};
`;

const AddButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 10px;
  flex-direction: row;
  margin-bottom: 50px;
`;

const AddButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({theme}) => theme.primary};
  margin-left: 5px;
`;

export default Layout;
