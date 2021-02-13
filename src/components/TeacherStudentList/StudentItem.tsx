import React from 'react';
import {StudentListItemType} from '../../types';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';

interface Props {
  item: StudentListItemType;
}

function StudentItem(props: Props): React.ReactElement {
  const {
    item: {studentName},
  } = props;

  return (
    <Container>
      <StyledText>{studentName}</StyledText>
    </Container>
  );
}

const Container = styled.View`
  background-color: ${colors.blueGrey};
  border-radius: 10px;
  margin: 5px 0;
  padding: 20px 10px;
`;

const StyledText = styled.Text`
  color: ${({theme}) => theme.font};
  font-size: 16px;
`;

export default StudentItem;
