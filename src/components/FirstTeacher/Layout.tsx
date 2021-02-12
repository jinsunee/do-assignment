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
  classRoomName: string;
  setClassRoomName: (input: string) => void;
  warningClassRoomName: string;
  accessCode: string;
  setAccessCode: (input: string) => void;
  warningAccessCode: string;
  loadingSubmit: boolean;
  onPressButton: () => void;
}

function Layout(props: Props): React.ReactElement {
  const {
    userName,
    setUserName,
    warningUserName,
    classRoomName,
    setClassRoomName,
    warningClassRoomName,
    accessCode,
    setAccessCode,
    warningAccessCode,
    loadingSubmit,
    onPressButton,
  } = props;

  return (
    <Container>
      <NavigationBar />
      <KeyboardWrapper>
        <Wrapper>
          <Title>선생님이시군요!</Title>
          <SubTitle>클래스를 개설해볼까요?</SubTitle>
          <ButtonWrapper>
            <TextInputBox
              title={'선생님 이름'}
              textInputProps={{
                value: userName,
                onChangeText: setUserName,
                placeholder: '학생들에게 친숙한 이름을 입력해주시면 좋아요!',
              }}
              warningText={warningUserName}
            />
            <TextInputBox
              title={'클래스 이름'}
              textInputProps={{
                value: classRoomName,
                onChangeText: setClassRoomName,
                placeholder: '예) 대한학원 수학 홍길동쌤',
              }}
              warningText={warningClassRoomName}
            />
            <TextInputBox
              title={'접속 코드'}
              subTitleText="개설하신 클래스에 접속하려면 코드가 필요해요!"
              textInputProps={{
                value: accessCode,
                onChangeText: setAccessCode,
                placeholder: '4글자 이상의 숫자, 문자 조합을 입력해주세요.',
              }}
              warningText={warningAccessCode}
            />
          </ButtonWrapper>
        </Wrapper>
      </KeyboardWrapper>
      <ButtonFixedOnButtom
        onPressSubmit={onPressButton}
        loading={loadingSubmit}
      />
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
