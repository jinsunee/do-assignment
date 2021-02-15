import {SettingMenuItemType, UpdateInfromationScreenType} from '../../types';

import {Alert} from 'react-native';
import Layout from './Layout';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

function Page(): React.ReactElement {
  const navigation = useNavigation();
  const goToUpdateInformation = (screenName: string, paramsObject?: Object) => {
    if (paramsObject) {
      navigation?.navigate(screenName, paramsObject);
      return;
    }

    navigation?.navigate(screenName);
  };
  const updateInformation: SettingMenuItemType[] = [
    {
      key: '클래스 정보',
      leftString: '클래스 정보',
      onPressMenuItem: () =>
        goToUpdateInformation('UpdateInformation', {
          screenType: UpdateInfromationScreenType.CLASS_INFORMATION,
          classRoomUID: '123',
        }),
    },
    {
      key: '프로필 정보',
      leftString: '프로필 정보',
      onPressMenuItem: () =>
        goToUpdateInformation('UpdateInformation', {
          screenType: UpdateInfromationScreenType.PROFILE,
          classRoomUID: '123',
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
      rightString: '0.0.1',
    },
  ];

  const requestSignOut = () => {
    Alert.alert('SignOut!');
  };

  return (
    <Layout
      updateInformation={updateInformation}
      aboutApp={aboutApp}
      onPressSignOut={requestSignOut}
    />
  );
}

export default Page;
