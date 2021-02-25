import {HeaderElementType, SettingMenuItemType} from '../../types';

import {Header} from '../../shared';
import MenuItem from './MenuItem';
import React from 'react';
import {SvgTeacherBlack} from '../../utils/Icons';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';
import {useActionSheet} from '@expo/react-native-action-sheet';

interface Props {
  updateInformation: SettingMenuItemType[];
  aboutApp: SettingMenuItemType[];
  onPressSignOut: () => void;
  classRoomName: string;
  userName: string;
}

function Layout(props: Props): React.ReactElement {
  const {
    updateInformation,
    aboutApp,
    onPressSignOut,
    classRoomName,
    userName,
  } = props;

  const {showActionSheetWithOptions} = useActionSheet();

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
      },
    );
  };

  const leftElements: HeaderElementType[] = [
    {
      key: classRoomName,
      element: <ClassRoomName>{classRoomName}</ClassRoomName>,
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

  return (
    <Container>
      <Header leftElements={leftElements} />
      <ProfileWrapper>
        <UserNameText>
          <BoldText>{userName}</BoldText>선생님
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

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const ClassRoomName = styled.Text`
  font-weight: bold;
  font-size: 20px;
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
