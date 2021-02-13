import {AssignmentStatus, AssingmentItemType} from '../types';

import React from 'react';
import {View} from 'react-native';
import {colors} from '../utils/theme';
import styled from '@emotion/native';

interface Props {
  item: AssingmentItemType;
}

function AssignmentItem(props: Props): React.ReactElement {
  const {
    item: {onPressElement, title, date, status},
  } = props;

  switch (status) {
    case AssignmentStatus.DEFAULT: {
      return (
        <Container onPress={onPressElement}>
          <View>
            <TitleWrapper>
              <StyledText>{title}</StyledText>
            </TitleWrapper>
            <StyledText>{date}</StyledText>
          </View>
        </Container>
      );
    }
    case AssignmentStatus.SUBMIT: {
      return (
        <Container onPress={onPressElement}>
          <View>
            <TitleWrapper>
              <StyledText>{title}</StyledText>
            </TitleWrapper>
            <StyledText>{date}</StyledText>
          </View>
          <Submit>
            <SubmitText>제출하기</SubmitText>
          </Submit>
        </Container>
      );
    }
    case AssignmentStatus.COMPLETE: {
      return (
        <Container onPress={onPressElement} color={colors.blueGrey}>
          <View>
            <TitleWrapper>
              <StyledText color={colors.blueGrey}>{title}</StyledText>
            </TitleWrapper>
            <StyledText color={colors.blueGrey}>{date}</StyledText>
          </View>
          <CompletedSubmit>
            <CompletedText>제출완료</CompletedText>
            {/* <SvgSmile /> */}
          </CompletedSubmit>
        </Container>
      );
    }
    case AssignmentStatus.LAST:
    default: {
      return (
        <Container onPress={onPressElement} color={colors.blueGrey}>
          <View>
            <TitleWrapper>
              <StyledText color={colors.blueGrey}>{title}</StyledText>
            </TitleWrapper>
            <StyledText color={colors.blueGrey}>{date}</StyledText>
          </View>
        </Container>
      );
    }
  }
}

interface Color {
  color?: string;
}

const Container = styled.TouchableOpacity<Color>`
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({color}) => color || colors.primary};
  padding: 10px;
  margin: 5px 0;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleWrapper = styled.View`
  height: 40px;
`;

const StyledText = styled.Text<Color>`
  color: ${({color, theme}) => color || theme.font};
  font-weight: bold;
  font-size: 14px;
`;

const Submit = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${colors.primary};
  justify-content: center;
  align-items: center;
`;

const SubmitText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${({theme}) => theme.background};
`;

const CompletedSubmit = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border-width: 1px;
  border-color: ${colors.blueGrey};
  justify-content: center;
  align-items: center;
`;

const CompletedText = styled.Text`
  font-weight: bold;
  font-size: 12px;
  color: ${colors.blueGrey};
`;

export default AssignmentItem;
