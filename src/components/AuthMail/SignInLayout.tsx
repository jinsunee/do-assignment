import Button from '../../shared/Button';
import KeyboardWrapper from '../../shared/KeyboardWrapper';
import NavigationBar from '../../shared/NavigationBar';
import React from 'react';
import TextInputBox from '../../shared/TextInputBox';
import styled from '@emotion/native';

interface Props {
  password: string;
  onChangePassword: (text: string) => void;
  warning?: string;
  loadingSubmit: boolean;
  onSubmit: () => void;
}

function Layout(props: Props): React.ReactElement {
  const {password, onChangePassword, warning, loadingSubmit, onSubmit} = props;

  return (
    <Container>
      <NavigationBar />
      <KeyboardWrapper>
        <Wrapper>
          <Title>이메일로 계속하기</Title>
          <TextInputBox
            title={'비밀번호'}
            textInputProps={{
              value: password,
              onChangeText: onChangePassword,
              placeholder: '비밀번호 입력',
              secureTextEntry: true,
            }}
            warningText={warning}
          />
          <Button
            value="로그인하기"
            loading={loadingSubmit}
            onPressButton={onSubmit}
          />
        </Wrapper>
      </KeyboardWrapper>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const Wrapper = styled.View`
  padding: 30px 15px;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${({theme}) => theme.font};
  margin-bottom: 40px;
`;

export default Layout;
