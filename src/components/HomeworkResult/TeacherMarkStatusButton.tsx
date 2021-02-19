import {MarkStatus} from '../../types';
import React from 'react';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';

interface Props {
  markStatus: MarkStatus;
  changeMarkStatus: () => void;
}

function StudentMarkStatus({
  markStatus,
  changeMarkStatus,
}: Props): React.ReactElement {
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
}

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

type ColorStyleProps = {
  color: string;
};

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

export default StudentMarkStatus;
