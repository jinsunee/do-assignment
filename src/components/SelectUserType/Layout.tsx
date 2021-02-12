import {Container} from '../../shared';
import React from 'react';
import UserButton from './UserButton';
import {UserType} from '../../types';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  goToStudent: () => void;
  goToTeacher: () => void;
}

function Layout(props: Props): React.ReactElement {
  const {goToStudent, goToTeacher} = props;
  const insets = useSafeAreaInsets();

  const studentButtonStyle = {
    marginRight: 15,
  };

  const teacherButtonStyle = {
    marginLeft: 15,
  };

  return (
    <Container paddingTop={insets.top}>
      <Wrapper>
        <Title>반가워요 :)</Title>
        <SubTitle>선생님이신가요?</SubTitle>
        <SubTitle>아니면 학생이신가요?</SubTitle>
        <ButtonWrapper>
          <UserButton
            userType={UserType.STUDENT}
            onPressButton={goToStudent}
            containerStyle={studentButtonStyle}
          />
          <UserButton
            userType={UserType.TEACHER}
            onPressButton={goToTeacher}
            containerStyle={teacherButtonStyle}
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
  justify-content: center;
`;

export default Layout;
