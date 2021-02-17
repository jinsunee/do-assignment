import Button from '../../shared/Button';
import Header from '../../shared/Header';
import KeyboardWrapper from '../../shared/KeyboardWrapper';
import React from 'react';
import TextInputBox from '../../shared/TextInputBox';
import styled from '@emotion/native';

interface Props {
  password: string;
  onChangePassword: (text: string) => void;
  confirmPassword: string;
  onChangeConfirmPassword: (text: string) => void;
  warning?: string;
  warningConfirm?: string;
  loadingSubmit: boolean;
  onSubmit: () => void;
}

function Layout(props: Props): React.ReactElement {
  const {
    password,
    onChangePassword,
    confirmPassword,
    onChangeConfirmPassword,
    warning = '',
    warningConfirm = '',
    loadingSubmit,
    onSubmit,
  } = props;

  return (
    <Container>
      <Header />
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
          <TextInputBox
            title={'비밀번호 확인'}
            textInputProps={{
              value: confirmPassword,
              onChangeText: onChangeConfirmPassword,
              placeholder: '비밀번호 확인 입력',
              secureTextEntry: true,
            }}
            warningText={warningConfirm}
          />
          <Button
            value="회원가입하기"
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
