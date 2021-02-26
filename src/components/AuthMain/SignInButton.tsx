import {SvgApple, SvgEmail} from '../../utils/Icons';

import React from 'react';
import {SignInType} from '../../types';
import {ViewStyle} from 'react-native';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';

interface Props {
  type?: SignInType;
  onPressButton?: () => void;
  containerStyle?: ViewStyle;
}

function LoginButton(props: Props) {
  const {type = SignInType.EMAIL, onPressButton} = props;

  const innerElement = (): React.ReactNode => {
    if (type === SignInType.EMAIL) {
      return (
        <Wrapper>
          <SvgEmail />
          <StyledText>이메일로 계속하기</StyledText>
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <SvgApple fill={colors.black[0]} />
        <StyledText>Apple로 계속하기</StyledText>
      </Wrapper>
    );
  };

  return <Container onPress={onPressButton}>{innerElement()}</Container>;
}

const Container = styled.TouchableOpacity`
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({theme}) => theme.font};
  margin: 5px 0;
`;

const Wrapper = styled.View`
  padding: 12px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #353535;
  margin-left: 5px;
`;

export default LoginButton;
