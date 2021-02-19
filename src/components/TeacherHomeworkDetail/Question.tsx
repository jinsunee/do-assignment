import {AssignmentQuestion} from '../../types';
import React from 'react';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';

interface Props {
  index: number;
  item: AssignmentQuestion;
}

function StudentSubmitList(props: Props) {
  const {
    index,
    item: {question, answer},
  } = props;
  return (
    <Container>
      <IndexNumber>{index + 1}번</IndexNumber>
      <Question>{question}</Question>
      <Answer>
        <AnswerText>{answer}</AnswerText>
      </Answer>
    </Container>
  );
}

const Container = styled.View`
  background: ${({theme}) => theme.background};
  box-shadow: 0px 0px 4px #e0e0e0;
  padding: 15px;
  margin: 10px 0;
`;

const IndexNumber = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${colors.gray[2]};
  margin-bottom: 10px;
`;

const Question = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${({theme}) => theme.font};
  margin: 10px 0;
`;

const Answer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.primary};
  padding: 10px 0;
`;

const AnswerText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${({theme}) => theme.font};
`;

export default StudentSubmitList;
