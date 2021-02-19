import {MarkStatus} from '../../types';
import React from 'react';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';

interface Props {
  markStatus: MarkStatus;
}

function StudentMarkStatus({markStatus}: Props): React.ReactElement {
  if (markStatus === MarkStatus.CORRECT) {
    return (
      <Container backgroundColor={colors.primary}>
        <StyledText>정답</StyledText>
      </Container>
    );
  }

  return (
    <Container backgroundColor={colors.negative}>
      <StyledText>오답</StyledText>
    </Container>
  );
}

type ColroStyleProps = {
  backgroundColor: string;
};

const Container = styled.View<ColroStyleProps>`
  justify-content: center;
  align-items: center;
  background-color: ${({backgroundColor}) => backgroundColor};
  flex-direction: row;
  border-radius: 20px;
`;

const StyledText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${colors.light};
  margin: 10px;
`;

export default StudentMarkStatus;
