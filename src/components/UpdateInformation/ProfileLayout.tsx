import Header from '../../shared/Header';
import {HeaderElementType} from '../../types';
import {KeyboardWrapper} from '../../shared';
import React from 'react';
import TextInputBox from '../../shared/TextInputBox';
import styled from '@emotion/native';

interface Props {
  loading: boolean;
  userName: string;
  setUserName: (input: string) => void;
  warningUserName: string;
  onPressSubmit: () => void;
}

function Layout(props: Props): React.ReactElement {
  const {
    loading,
    userName,
    setUserName,
    warningUserName,
    onPressSubmit,
  } = props;
  const rightElements: HeaderElementType[] = [
    {
      key: 'filter button',
      element: <SubmitText>완료</SubmitText>,
      onPressElement: onPressSubmit,
    },
  ];

  return (
    <Container>
      <Header rightElements={rightElements} />
      <KeyboardWrapper>
        <Wrapper>
          <TitleText>프로필 정보 수정</TitleText>
          <TextInputBox
            title={'이름'}
            textInputProps={{
              value: userName,
              onChangeText: setUserName,
              placeholder: '이름을 입력해주세요.',
            }}
            warningText={warningUserName}
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
