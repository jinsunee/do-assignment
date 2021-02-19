import {MarkStatus, SubmitAnswersType, UserType} from '../../types';

import React from 'react';
import StudentMarkStatus from './StudentMarkStatus';
import TeacherMarkStatusButton from './TeacherMarkStatusButton';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';
import useUser from '../../hooks/useUser';

interface Props {
  item: SubmitAnswersType;
  changeMarkStatus: () => void;
}

function SubmitAnswerItem(props: Props) {
  const {
    item: {index, question, answer, submitValue, markStatus},
    changeMarkStatus,
  } = props;

  const {user} = useUser();

  const renderMarkStatusElement = (): React.ReactElement => {
    if (user?.userType === UserType.TEACHER) {
      return (
        <TeacherMarkStatusButton
          markStatus={markStatus}
          changeMarkStatus={changeMarkStatus}
        />
      );
    }

    return <StudentMarkStatus markStatus={markStatus} />;
  };

  return (
    <Container>
      <RowWrapper>
        <IndexNumber
          color={
            markStatus === MarkStatus.CORRECT ? colors.primary : colors.negative
          }>
          {index + 1}번
        </IndexNumber>
        {renderMarkStatusElement()}
      </RowWrapper>
      <Question>{question}</Question>
      <SubmitAnswer
        color={
          markStatus === MarkStatus.CORRECT ? colors.primary : colors.negative
        }>
        <SubmitAnswerText
          color={
            markStatus === MarkStatus.CORRECT ? colors.primary : colors.negative
          }>
          {submitValue}
        </SubmitAnswerText>
      </SubmitAnswer>
      <Answer>정답: {answer}</Answer>
    </Container>
  );
}

const Container = styled.View`
  background-color: ${({theme}) => theme.background};
  box-shadow: 0px 0px 4px #e0e0e0;
  padding: 15px;
  margin: 10px 15px;
`;

type ColorStyleProps = {
  color: string;
};

const IndexNumber = styled.Text<ColorStyleProps>`
  font-weight: bold;
  font-size: 18px;
  color: ${({color}) => color};
`;

const RowWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Question = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${({theme}) => theme.font};
  margin: 10px 0;
`;

const SubmitAnswer = styled.View<ColorStyleProps>`
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({color}) => color};
`;

const SubmitAnswerText = styled.Text<ColorStyleProps>`
  color: ${({color}) => color};
  font-weight: bold;
  font-size: 16px;
`;

const Answer = styled.Text`
  font-weight: bold;
  font-size: 12px;
  color: ${({theme}) => theme.font};
  margin: 5px 0;
`;

export default SubmitAnswerItem;
