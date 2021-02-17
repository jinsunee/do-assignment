import {MarkStatus, SubmitAnswersType} from '../../types';

import React from 'react';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';

interface Props {
  item: SubmitAnswersType;
  changeMarkStatus: () => void;
}

function SubmitAnswerItem(props: Props) {
  const {
    item: {index, question, answer, submitValue, markStatus},
    changeMarkStatus,
  } = props;

  const renderMarkStatusButton = (): React.ReactElement => {
    if (markStatus === MarkStatus.CORRECT) {
      return (
        <MarkStatusButtonWrapper>
          <MarkedStatus onPress={changeMarkStatus}>
            <MarkStatusText color={colors.blueGray[0]}>오답</MarkStatusText>
          </MarkedStatus>
          <MarkedStatus onPress={changeMarkStatus}>
            <MarkStatusText color={colors.light}>정답</MarkStatusText>
          </MarkedStatus>
          <MarkedCorrect />
        </MarkStatusButtonWrapper>
      );
    }

    return (
      <MarkStatusButtonWrapper>
        <MarkedStatus onPress={changeMarkStatus}>
          <MarkStatusText color={colors.light}>오답</MarkStatusText>
        </MarkedStatus>
        <MarkedStatus onPress={changeMarkStatus}>
          <MarkStatusText color={colors.blueGray[0]}>정답</MarkStatusText>
        </MarkedStatus>
        <MarkedIncorrect />
      </MarkStatusButtonWrapper>
    );
  };

  return (
    <Container>
      <RowWrapper>
        <IndexNumber
          color={
            markStatus === MarkStatus.CORRECT ? colors.primary : colors.negative
          }>
          {index}번
        </IndexNumber>
        {renderMarkStatusButton()}
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

const MarkStatusButtonWrapper = styled.View`
  border-radius: 20px;
  border-width: 1px;
  border-color: ${colors.blueGray[0]};
  flex-direction: row;
  width: 95px;
  height: 40px;
  align-items: center;
`;

const MarkedStatus = styled.TouchableOpacity`
  z-index: 99;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MarkStatusText = styled.Text<ColorStyleProps>`
  color: ${({color}) => color};
  margin: 5px 10px;
  font-size: 14px;
`;

const MarkedIncorrect = styled.View`
  z-index: 0;
  position: absolute;
  left: -1;
  width: 50px;
  height: 40px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${colors.negative};
  background-color: ${colors.negative};
`;

const MarkedCorrect = styled.View`
  z-index: 0;
  position: absolute;
  right: -1;
  width: 50px;
  height: 40px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${colors.primary};
  background-color: ${colors.primary};
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
