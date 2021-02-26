import {AssignmentQuestion, HeaderElementType} from '../../types';
import {Keyboard, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SvgPlus2, SvgTime} from '../../utils/Icons';

import DatePicker from './DatePicker';
import Header from '../../shared/Header';
import {LayoutType} from './Container';
import {LoadingScreen} from '../../shared';
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
  removeQuestion: (index: number) => void;
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
    removeQuestion,
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
    return questions?.map(({question, answer}, index) => (
      <QuestionItem
        index={index}
        question={question}
        answer={answer}
        onChangeTextQuestion={(text) => onChangeQuestion(index, text)}
        onChangeTextAnswer={(text) => onChangeAnswer(index, text)}
        removeQuestion={removeQuestion}
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

  const renderLoading = (): React.ReactElement | null => {
    if (loading) {
      return <LoadingScreen />;
    }

    return null;
  };

  const renderLayoutTitle = (): React.ReactElement => {
    if (layoutType === LayoutType.ADD_HOMEWORK) {
      return <Title>과제 추가</Title>;
    }

    return <Title>과제 수정</Title>;
  };

  return (
    <Container>
      <Header rightElements={rightElements} />
      {renderLoading()}
      <KeyboardView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Wrapper>
          <TitleWrapper>{renderLayoutTitle()}</TitleWrapper>
          <AssignmentTitleInput
            value={title}
            onChangeText={setTitle}
            placeholder={'제목을 입력해주세요'}
            placeholderTextColor={colors.blueGray[0]}
            multiline={true}
            warning={warningTitle}
          />
          <DescriptionInput
            value={description}
            onChangeText={setDescription}
            placeholder={'설명을 입력해주세요.'}
            placeholderTextColor={colors.blueGray[0]}
            multiline={true}
          />
          <DatePicker
            expireDate={expireDate}
            setExpireDate={setExpireDate}
            warning={warningExpireDate}
          />
          <LimitTimeWrapper warning={warningLimitTime}>
            <SvgTime fill={limitTime ? theme.font : colors.blueGray[0]} />
            <LimitTimeInput
              value={limitTime}
              onChangeText={setLimitTime}
              placeholder={'과제수행시간(분)'}
              placeholderTextColor={colors.blueGray[0]}
              // maxLength={10}
              keyboardType="number-pad"
            />
            {limitTime ? <LimitTimeUnit>분</LimitTimeUnit> : null}
          </LimitTimeWrapper>
          {renderQuestions()}
        </Wrapper>
        {renderBottomWrapper()}
      </KeyboardView>
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

const KeyboardView = styled.KeyboardAvoidingView`
  flex: 1;
`;

const Wrapper = styled.ScrollView`
  padding: 5px 15px;
`;

const TitleWrapper = styled.View`
  padding: 10px 0;
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

type WarningStyleProps = {
  warning: string;
};

const AssignmentTitleInput = styled.TextInput<WarningStyleProps>`
  font-weight: bold;
  font-size: 22px;
  color: ${({theme}) => theme.font};
  padding: 10px 0;
  border-bottom-width: ${({warning}) => (warning ? '2px' : '0px')};
  border-bottom-color: ${colors.negative};
`;

const DescriptionInput = styled.TextInput`
  font-weight: bold;
  font-size: 16px;
  color: ${({theme}) => theme.font};
  padding: 5px 0;
`;

const LimitTimeWrapper = styled.View<WarningStyleProps>`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  border-bottom-width: ${({warning}) => (warning ? '2px' : '0px')};
  border-bottom-color: ${colors.negative};
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
