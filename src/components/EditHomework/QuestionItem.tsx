import React from 'react';
import {SvgTrash} from '../../utils/Icons';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';

interface Props {
  index: number;
  question: string;
  answer: string;
  onChangeTextQuestion: (text: string) => void;
  onChangeTextAnswer: (text: string) => void;
  removeQuestion: (index: number) => void;
}

function QuestionItem(props: Props) {
  const {
    index,
    question,
    answer,
    onChangeTextQuestion,
    onChangeTextAnswer,
    removeQuestion,
  } = props;

  return (
    <Container>
      <IndexNumber>{index + 1}</IndexNumber>
      <QuestionInput
        value={question}
        onChangeText={onChangeTextQuestion}
        placeholder={'문제를 입력해주세요.'}
        placeholderTextColor={colors.blueGray[0]}
      />
      <QuestionInput
        value={answer}
        onChangeText={onChangeTextAnswer}
        placeholder={'답을 입력해주세요.'}
        placeholderTextColor={colors.blueGray[0]}
      />
      <TrashButton onPress={() => removeQuestion(index)}>
        <SvgTrash width={20} height={20} />
      </TrashButton>
    </Container>
  );
}

const Container = styled.View`
  margin: 10px 0;
  padding: 20px 10px 10px 10px;
  box-shadow: 0px 0px 4px #e0e0e0;
  background-color: ${({theme}) => theme.background};
`;

const IndexNumber = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${colors.gray[2]};
`;

const QuestionInput = styled.TextInput`
  font-weight: bold;
  font-size: 16px;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.blueGray[0]};
`;

const TrashButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 10px;
  align-self: flex-end;
`;

export default QuestionItem;
