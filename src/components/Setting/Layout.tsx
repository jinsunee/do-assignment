import {HeaderElementType, SettingMenuItemType, UserType} from '../../types';
import {SvgStudentBlack, SvgTeacherBlack} from '../../utils/Icons';

import {Header} from '../../shared';
import MenuItem from './MenuItem';
import React from 'react';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';
import {useActionSheet} from '@expo/react-native-action-sheet';
import useClassRoom from '../../hooks/useClassRoom';
import useUser from '../../hooks/useUser';

interface Props {
  updateInformation: SettingMenuItemType[];
  aboutApp: SettingMenuItemType[];
  onPressSignOut: () => void;
  userType?: UserType;
}

function Layout(props: Props): React.ReactElement {
  const {
    updateInformation,
    aboutApp,
    onPressSignOut,
    userType = UserType.TEACHER,
  } = props;

  const {showActionSheetWithOptions} = useActionSheet();
  const {classRoom} = useClassRoom();
  const {user} = useUser();

  const _pressLogout = () => {
    const options = ['로그아웃', '취소'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          onPressSignOut();
        }
        // Do something here depending on the button index selected
      },
    );
  };

  const leftElements: HeaderElementType[] = [
    {
      key: classRoom?.classRoomName || '123',
      element: <ClassRoomName>{classRoom?.classRoomName}</ClassRoomName>,
      onPressElement: () => console.log(),
    },
  ];

  const renderUpdateInformation = (): React.ReactElement[] => {
    return updateInformation.map((item) => (
      <MenuItem key={item.key} item={item} />
    ));
  };

  const renderAboutApp = (): React.ReactElement[] => {
    return aboutApp.map((item) => <MenuItem key={item.key} item={item} />);
  };

  if (userType === UserType.TEACHER) {
    return (
      <Container>
        <Header leftElements={leftElements} />
        <ProfileWrapper>
          <UserNameText>
            <BoldText>{user?.displayName || ''}</BoldText>선생님
          </UserNameText>
          <SvgTeacherBlack />
        </ProfileWrapper>
        <ItemGroupWrapper>
          <Title>정보 수정</Title>
          {renderUpdateInformation()}
        </ItemGroupWrapper>
        <ItemGroupWrapper>{renderAboutApp()}</ItemGroupWrapper>
        <ItemGroupWrapper>
          <SignOutButton onPress={_pressLogout}>
            <SignOutText>로그아웃</SignOutText>
          </SignOutButton>
        </ItemGroupWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <ProfileWrapper>
        <UserNameText>
          <BoldText>{user?.displayName || ''}</BoldText>학생
        </UserNameText>
        <SvgStudentBlack />
      </ProfileWrapper>
      <ItemGroupWrapper>
        <Title>정보 수정</Title>
        {renderUpdateInformation()}
      </ItemGroupWrapper>
      <ItemGroupWrapper>{renderAboutApp()}</ItemGroupWrapper>
      <ItemGroupWrapper>
        <SignOutButton onPress={_pressLogout}>
          <SignOutText>로그아웃</SignOutText>
        </SignOutButton>
      </ItemGroupWrapper>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const ClassRoomName = styled.Text`
  font-weight: bold;
  font-size: 20px;
  line-height: 21px;
  color: ${({theme}) => theme.font};
`;

const ProfileWrapper = styled.View`
  border-bottom-width: 4px;
  border-bottom-color: ${colors.gray[1]};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const UserNameText = styled.Text`
  font-weight: 500;
  font-size: 16px;
`;

const BoldText = styled.Text`
  font-weight: bold;
  font-size: 20px;
`;

const ItemGroupWrapper = styled.View`
  padding: 20px;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${({theme}) => theme.font};
`;

const SignOutButton = styled.TouchableOpacity``;

const SignOutText = styled.Text`
  color: ${colors.negative};
  font-size: 16px;
  font-weight: bold;
`;

export default Layout;
