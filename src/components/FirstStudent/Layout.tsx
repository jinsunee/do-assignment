import {ButtonFixedOnButtom} from '../../shared';
import {Container} from '../../shared';
import KeyboardWrapper from '../../shared/KeyboardWrapper';
import NavigationBar from '../../shared/NavigationBar';
import React from 'react';
import {TextInputBox} from '../../shared';
import styled from '@emotion/native';

interface Props {
  userName: string;
  setUserName: (input: string) => void;
  warningUserName: string;
  accessCode: string;
  setAccessCode: (input: string) => void;
  warningAccessCode: string;
}

function Layout(props: Props): React.ReactElement {
  const {
    userName,
    setUserName,
    warningUserName,
    accessCode,
    setAccessCode,
    warningAccessCode,
  } = props;

  return (
    <Container>
      <NavigationBar />
      <KeyboardWrapper>
        <Wrapper>
          <Title>학생이시군요!</Title>
          <SubTitle>클래스에 참여해볼까요?</SubTitle>
          <ButtonWrapper>
            <TextInputBox
              title={'학생 이름'}
              textInputProps={{
                value: userName,
                onChangeText: setUserName,
                placeholder: '본명을 입력해주세요.',
              }}
              warningText={warningUserName}
            />
            <TextInputBox
              title={'접속 코드'}
              subTitleText="클래스에 접속하려면 선생님께서 알려주신 코드가 필요해요!"
              textInputProps={{
                value: accessCode,
                onChangeText: setAccessCode,
                placeholder: '접속코드를 입력해주세요.',
              }}
              warningText={warningAccessCode}
            />
          </ButtonWrapper>
        </Wrapper>
      </KeyboardWrapper>
      <ButtonFixedOnButtom onPressSubmit={() => console.log()} />
    </Container>
  );
}

const Wrapper = styled.View`
  margin-top: 40px;
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
  margin-top: 40px;
`;

export default Layout;
