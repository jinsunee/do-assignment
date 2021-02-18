import {AssignmentQuestion, HeaderElementType} from '../../types';
import {Keyboard, KeyboardAvoidingView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SvgPlus2, SvgTime} from '../../utils/Icons';

import DatePicker from './DatePicker';
import Header from '../../shared/Header';
import {LayoutType} from './Container';
import QuestionItem from './QuestionItem';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useTheme from '../../hooks/useTheme';

interface Props {
  layoutType: LayoutType;
  loading: boolean;
  title: string;
  setTitle: (input: string) => void;
  warningTitle: string;
  description: string;
  setDescription: (input: string) => void;
  expireDate: Date | undefined;
  setExpireDate: (input: Date) => void;
  warningExpireDate: string;
  limitTime: string;
  setLimitTime: (input: string) => void;
  warningLimitTime: string;
  questions: AssignmentQuestion[];
  onChangeQuestion: (index: number, text: string) => void;
  onChangeAnswer: (index: number, text: string) => void;
  onPressSubmit: () => void;
  addQuestions: () => void;
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
    expireDate,
    setExpireDate,
    warningExpireDate,
    limitTime,
    setLimitTime,
    warningLimitTime,
    questions,
    onChangeQuestion,
    onChangeAnswer,
    onPressSubmit,
    addQuestions,
  } = props;

  const {theme} = useTheme();
  const insets = useSafeAreaInsets();

  const [shownKeyboard, setShownKeyboard] = useState<boolean>(false);

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => {
      setShownKeyboard(true);
    });
    Keyboard.addListener('keyboardWillHide', () => {
      setShownKeyboard(false);
    });
  }, []);

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

  const renderBottomWrapper = (): React.ReactElement | null => {
    if (shownKeyboard) {
      return (
        <BottomWrapper>
          <AddButton bottom={'0px'} onPress={addQuestions}>
            <SvgPlus2 width={15} height={15} fill={colors.light} />
          </AddButton>
        </BottomWrapper>
      );
    }

    return null;
  };

  return (
    <Container>
      <Header rightElements={rightElements} />
      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
        <Wrapper>
          <TitleWrapper>
            <Title>과제 추가</Title>
          </TitleWrapper>
          <AssignmentTitleInput
            value={title}
            onChangeText={setTitle}
            placeholder={'제목을 입력해주세요'}
            placeholderTextColor={colors.blueGray[0]}
            multiline={true}
          />
          <DescriptionInput
            value={description}
            onChangeText={setDescription}
            placeholder={'설명을 입력해주세요.'}
            placeholderTextColor={colors.blueGray[0]}
            multiline={true}
          />
          <DatePicker expireDate={expireDate} setExpireDate={setExpireDate} />
          <LimitTimeWrapper>
            <SvgTime fill={limitTime ? theme.font : colors.blueGray[0]} />
            <LimitTimeInput
              value={limitTime}
              onChangeText={setLimitTime}
              placeholder={'과제수행시간(분)'}
              placeholderTextColor={colors.blueGray[0]}
              maxLength={10}
              returnKeyType="done"
              keyboardType="number-pad"
            />
            {limitTime ? <LimitTimeUnit>분</LimitTimeUnit> : null}
          </LimitTimeWrapper>
          {renderQuestions()}
        </Wrapper>
        {renderBottomWrapper()}
      </KeyboardAvoidingView>
      <BottomWrapper>
        <AddButton bottom={`${insets.bottom}px`} onPress={addQuestions}>
          <SvgPlus2 width={15} height={15} fill={colors.light} />
        </AddButton>
      </BottomWrapper>
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

const LimitTimeWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

const LimitTimeInput = styled.TextInput`
  font-weight: 500;
  font-size: 16px;
  color: ${({theme}) => theme.font};
  padding: 5px 0;
  margin-left: 10px;
`;

const LimitTimeUnit = styled.Text`
  color: ${({theme}) => theme.font};
  font-weight: 500;
  font-size: 16px;
`;

const BottomWrapper = styled.View`
  width: 100%;
  background-color: ${colors.blueGray[0]};
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

type PaddingBottomStyleProps = {
  bottom: string;
};

const AddButton = styled.TouchableOpacity<PaddingBottomStyleProps>`
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 30px;
  background-color: ${({theme}) => theme.primary};
  margin-bottom: ${({bottom}) => bottom};
`;

export default Layout;
