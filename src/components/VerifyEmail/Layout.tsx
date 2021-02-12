import {BoldText, Button, Container} from '../../shared';

import React from 'react';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useTheme from '../../hooks/useTheme';

interface Props {
  resendEmail: () => void;
  goToSignIn: () => void;
}

function Layout(props: Props): React.ReactElement {
  const {resendEmail, goToSignIn} = props;

  const insets = useSafeAreaInsets();
  const {theme} = useTheme();

  const resendStyle = {
    containerStyle: {
      borderWidth: 1,
      borderBottomColor: theme.font,
      backgroundColor: theme.background,
      marginRight: 5,
    },
    textStyle: {
      color: theme.font,
    },
  };

  const goToSignInStyle = {
    textStyle: {
      marginLeft: 5,
    },
  };

  return (
    <Container paddingTop={insets.top}>
      <Wrapper>
        <Title>이메일 인증!</Title>
        <SubTitle>
          <BoldText>jsunee7246@gmail.com</BoldText>으로 인증메일을 전송했어요.
        </SubTitle>
        <SubTitle>메일함을 확인해주세요!</SubTitle>
        <ButtonWrapper>
          <Button
            value="이메일 재전송"
            onPressButton={resendEmail}
            containerStyle={resendStyle.containerStyle}
            textStyle={resendStyle.textStyle}
          />
          <Button
            value="로그인하러가기"
            onPressButton={goToSignIn}
            containerStyle={goToSignInStyle.textStyle}
          />
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
}

const Wrapper = styled.View`
  margin-top: 92px;
  padding: 0 26px;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 40px;
  color: ${({theme}) => theme.primary};
  margin-bottom: 10px;
`;

const SubTitle = styled.Text`
  font-size: 20px;
  color: ${({theme}) => theme.font};
  line-height: 25px;
  margin-bottom: 5px;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  margin-top: 40px;
`;

export default Layout;
