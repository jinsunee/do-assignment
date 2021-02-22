import Header from '../../shared/Header';
import {HeaderElementType} from '../../types';
import {KeyboardWrapper} from '../../shared';
import {LoadingScreen} from '../../shared';
import React from 'react';
import TextInputBox from '../../shared/TextInputBox';
import styled from '@emotion/native';
interface Props {
  loading: boolean;
  classRoomName: string;
  setClassRoomName: (input: string) => void;
  warningClassRoomName: string;
  accessCode: string;
  setAccessCode: (input: string) => void;
  warningAccessCode: string;
  onPressSubmit: () => void;
}

function Layout(props: Props): React.ReactElement {
  const {
    loading,
    classRoomName,
    setClassRoomName,
    warningClassRoomName,
    accessCode,
    setAccessCode,
    warningAccessCode,
    onPressSubmit,
  } = props;
  const rightElements: HeaderElementType[] = [
    {
      key: 'filter button',
      element: <SubmitText>완료</SubmitText>,
      onPressElement: onPressSubmit,
    },
  ];

  const renderLoading = (): React.ReactElement | null => {
    if (loading) {
      return <LoadingScreen />;
    }

    return null;
  };

  return (
    <Container>
      <Header rightElements={rightElements} />
      {renderLoading()}
      <KeyboardWrapper>
        <Wrapper>
          <TitleText>클래스 정보 수정</TitleText>
          <TextInputBox
            title={'클래스 이름'}
            textInputProps={{
              value: classRoomName,
              onChangeText: setClassRoomName,
              placeholder: '예) 대한학원 코딩학원 홍길동쌤',
            }}
            warningText={warningClassRoomName}
          />
          <TextInputBox
            title={'접속 코드'}
            subTitleText={'접속코드를 학생들에게 알려주세요!'}
            textInputProps={{
              value: accessCode,
              onChangeText: setAccessCode,
              placeholder: '4글자 이상의 숫자, 문자 조합을 입력해주세요.',
            }}
            warningText={warningAccessCode}
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

const Wrapper = styled.ScrollView`
  padding: 5px 15px;
`;

const TitleText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${({theme}) => theme.font};
  margin: 20px 0;
`;

const SubmitText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${({theme}) => theme.primary};
`;

export default Layout;
