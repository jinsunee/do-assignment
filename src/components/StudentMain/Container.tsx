import Layout from './Layout';
import React from 'react';
import {UserType} from '../../types';
import {assignmentsDummy as items} from '../../../assets/dummy/assignments';
import {useNavigation} from '@react-navigation/native';

function Page(): React.ReactElement {
  const navigation = useNavigation();

  const goToSetting = () => {
    if (navigation) {
      navigation.navigate('Setting', {userType: UserType.STUDENT});
    }
  };

  return <Layout items={items} onPressSetting={goToSetting} />;
}

export default Page;
