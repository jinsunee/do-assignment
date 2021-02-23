import {
  SettingMenuItemType,
  UpdateInfromationScreenType,
  UserType,
} from '../../types';

import React from 'react';
import StudentLayout from './StudentLayout';
import TeacherLayout from './TeacherLayout';
import VersionCheck from 'react-native-version-check';
import {signOut} from '../../apis/delete';
import useClassRoom from '../../hooks/useClassRoom';
import {useNavigation} from '@react-navigation/native';
import useUser from '../../hooks/useUser';

function Page(): React.ReactElement {
  const navigation = useNavigation();
  const {user} = useUser();
  const {classRoom} = useClassRoom();

  const goToUpdateInformation = (screenName: string, paramsObject?: Object) => {
    if (paramsObject) {
      navigation?.navigate(screenName, paramsObject);
      return;
    }

    navigation?.navigate(screenName);
  };

  const updateInformation: SettingMenuItemType[] =
    user?.userType === UserType.TEACHER
      ? [
          {
            key: '클래스 정보',
            leftString: '클래스 정보',
            onPressMenuItem: () =>
              goToUpdateInformation('UpdateInformation', {
                screenType: UpdateInfromationScreenType.CLASS_INFORMATION,
                classRoomUID: classRoom?.classRoomUID,
              }),
          },
          {
            key: '프로필 정보',
            leftString: '프로필 정보',
            onPressMenuItem: () =>
              goToUpdateInformation('UpdateInformation', {
                screenType: UpdateInfromationScreenType.PROFILE,
                classRoomUID: classRoom?.classRoomUID,
              }),
          },
        ]
      : [
          {
            key: '프로필 정보',
            leftString: '프로필 정보',
            onPressMenuItem: () =>
              goToUpdateInformation('UpdateInformation', {
                screenType: UpdateInfromationScreenType.PROFILE,
                classRoomUID: classRoom?.classRoomUID,
              }),
          },
        ];

  const aboutApp: SettingMenuItemType[] = [
    {
      key: '이용약관',
      leftString: '이용약관',
      onPressMenuItem: () =>
        goToUpdateInformation('WebView', {
          uri: 'https://doassignment.surge.sh/',
        }),
    },
    {
      key: '앱 버전',
      leftString: '앱 버전',
      rightString: VersionCheck.getCurrentVersion(),
    },
  ];

  const requestSignOut = async () => {
    await signOut();
  };

  if (user?.userType === UserType.TEACHER) {
    return (
      <TeacherLayout
        updateInformation={updateInformation}
        aboutApp={aboutApp}
        onPressSignOut={requestSignOut}
        classRoomName={classRoom?.classRoomName || ''}
        userName={user?.displayName || ''}
      />
    );
  }

  return (
    <StudentLayout
      updateInformation={updateInformation}
      aboutApp={aboutApp}
      onPressSignOut={requestSignOut}
      userName={user?.displayName || ''}
    />
  );
}

export default Page;
