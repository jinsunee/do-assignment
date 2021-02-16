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
          <LeftLine />
          <View>
            <TitleWrapper>
              <StyledText>{title}</StyledText>
            </TitleWrapper>
            {date ? (
              <StyledText>{`${date?.getFullYear()}/${
                date?.getMonth() + 1
              }/${date?.getDate()} ${date?.getHours()}:${date?.getMinutes()}:${date?.getSeconds()}`}</StyledText>
            ) : null}
          </View>
        </Container>
      );
    }
    case AssignmentStatus.NOT_YET: {
      return (
        <Container onPress={onPressElement}>
          <LeftLine />

          <View>
            <TitleWrapper>
              <StyledText>{title}</StyledText>
            </TitleWrapper>
            {date ? (
              <StyledText>{`${date?.getFullYear()}/${
                date?.getMonth() + 1
              }/${date?.getDate()} ${date?.getHours()}:${date?.getMinutes()}:${date?.getSeconds()}`}</StyledText>
            ) : null}
          </View>
          <Submit>
            <SubmitText>제출하기</SubmitText>
          </Submit>
        </Container>
      );
    }
    case AssignmentStatus.COMPLETED: {
      return (
        <Container onPress={onPressElement} color={colors.blueGray[0]}>
          <LeftLine />

          <View>
            <TitleWrapper>
              <StyledText color={colors.blueGray[0]}>{title}</StyledText>
            </TitleWrapper>
            {date ? (
              <StyledText color={colors.blueGray[0]}>{`${date?.getFullYear()}/${
                date?.getMonth() + 1
              }/${date?.getDate()} ${date?.getHours()}:${date?.getMinutes()}:${date?.getSeconds()}`}</StyledText>
            ) : null}
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
        <Container onPress={onPressElement} color={colors.blueGray[0]}>
          <LeftLine />

          <View>
            <TitleWrapper>
              <StyledText color={colors.blueGray[0]}>{title}</StyledText>
            </TitleWrapper>
            {date ? (
              <StyledText color={colors.blueGray[0]}>{`${date?.getFullYear()}/${
                date?.getMonth() + 1
              }/${date?.getDate()} ${date?.getHours()}:${date?.getMinutes()}:${date?.getSeconds()}`}</StyledText>
            ) : null}
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
  height: 90px;
  padding: 15px;
  margin: 5px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({theme}) => theme.background};
  box-shadow: 0px 0px 2px #c1c8dd;
`;

const LeftLine = styled.View`
  position: absolute;
  left: 0;
  height: 90px;
  width: 3px;
  background-color: ${({theme}) => theme.primary};
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
  border-color: ${colors.blueGray[0]};
  justify-content: center;
  align-items: center;
`;

const CompletedText = styled.Text`
  font-weight: bold;
  font-size: 12px;
  color: ${colors.blueGray[0]};
`;

export default AssignmentItem;
