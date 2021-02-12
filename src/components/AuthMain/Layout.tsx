import {Container} from '../../shared/style';
import React from 'react';
import SignInButton from './SignInButton';
import {SignInType} from '../../types';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  onPressEmail: () => void;
  onPressApple: () => void;
}

function Layout(props: Props): React.ReactElement {
  const {onPressApple, onPressEmail} = props;
  const insets = useSafeAreaInsets();

  return (
    <Container paddingTop={insets.top}>
      <Wrapper>
        <Title>반가워요 :)</Title>
        <SubTitle>선생님이야에 오신 것을 환영합니다.</SubTitle>
        <SignButtonaWrapper>
          <SignInButton type={SignInType.EMAIL} onPressButton={onPressEmail} />
          <SignInButton type={SignInType.APPLE} onPressButton={onPressApple} />
        </SignButtonaWrapper>
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
  color: #4360d7;
`;

const SubTitle = styled.Text`
  font-size: 20px;
  color: #000000;
  line-height: 50px;
`;

const SignButtonaWrapper = styled.View`
  margin: 40px 0;
`;

export default Layout;
