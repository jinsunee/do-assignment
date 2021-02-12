import {SvgStudentBlack, SvgTeacherBlack} from '../../utils/Icons';

import React from 'react';
import {UserType} from '../../types';
import {ViewStyle} from 'react-native';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';

interface Props {
  userType: UserType;
  onPressButton: () => void;
  containerStyle?: ViewStyle;
}

function UserButton(props: Props): React.ReactElement {
  const {userType, onPressButton = () => console.log(), containerStyle} = props;

  if (userType === UserType.STUDENT) {
    return (
      <Container style={containerStyle}>
        <SvgStudentBlack />
        <Button onPress={onPressButton}>
          <ButtonText>학생</ButtonText>
        </Button>
      </Container>
    );
  }

  return (
    <Container style={containerStyle}>
      <SvgTeacherBlack />
      <Button onPress={onPressButton}>
        <ButtonText>선생님</ButtonText>
      </Button>
    </Container>
  );
}

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  background-color: ${colors.gray[0]};
  justify-content: center;
  align-items: center;
  width: 102px;
  height: 102px;
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${colors.black[0]};
`;

export default UserButton;
