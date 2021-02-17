import {StudentSubmitStatus, StudentSubmitStatusType} from '../../types';

import React from 'react';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';

interface Props {
  item: StudentSubmitStatus;
}

function StudentSubmitList(props: Props) {
  const {
    item: {studentName, onPressElement, submitStatus},
  } = props;

  return (
    <Container onPress={onPressElement}>
      <StudentName>{studentName}</StudentName>
      <SubmitStatus
        textColor={
          submitStatus === StudentSubmitStatusType.COMPLETED
            ? colors.navy[0]
            : colors.negative
        }>
        {submitStatus === StudentSubmitStatusType.COMPLETED
          ? '제출 완료'
          : '미제출'}
      </SubmitStatus>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  padding: 25px 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.blueGray[2]};
  border-radius: 10px;
  margin: 5px 0;
`;

const StudentName = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.font};
`;

type SubmitStatusStyleProps = {
  textColor?: string;
};

const SubmitStatus = styled.Text<SubmitStatusStyleProps>`
  font-weight: bold;
  font-size: 12px;
  color: ${({textColor}) => textColor};
`;

export default StudentSubmitList;
