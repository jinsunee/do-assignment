import Button from '../../shared/Button';
import KeyboardWrapper from '../../shared/KeyboardWrapper';
import NavigationBar from '../../shared/NavigationBar';
import React from 'react';
import TextInputBox from '../../shared/TextInputBox';
import styled from '@emotion/native';

interface Props {
  email: string;
  onChageEmail: (text: string) => void;
  warning?: string;
  loadingSubmit: boolean;
  onSubmit: () => void;
}

function Layout(props: Props): React.ReactElement {
  const {email, onChageEmail, warning = '', loadingSubmit, onSubmit} = props;

  return (
    <Container>
      <NavigationBar />
      <KeyboardWrapper>
        <Wrapper>
          <Title>이메일로 계속하기</Title>
          <TextInputBox
            title={'이메일'}
            textInputProps={{
              value: email,
              onChangeText: onChageEmail,
              placeholder: '이메일 입력',
            }}
            warningText={warning}
          />
          <Button
            value="계속하기"
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
