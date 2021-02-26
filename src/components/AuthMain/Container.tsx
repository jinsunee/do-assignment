import {appleAuth, pressAppleButton} from '../../apis/insert';

import Layout from './Layout';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

function Page(): React.ReactElement {
  const navigation = useNavigation();

  React.useEffect(() => {
    if (appleAuth.isSupported) {
      return appleAuth.onCredentialRevoked(async () => {
        console.warn(
          'If this function executes, User Credentials have been Revoked',
        );
      });
    }
  }, []);

  const goToFirstEmail = (): void => {
    if (navigation) {
      navigation.navigate('AuthMail');
    }
  };

  return (
    <Layout
      onPressEmail={goToFirstEmail}
      onPressApple={pressAppleButton}
      appleIsSupported={appleAuth.isSupported}
    />
  );
}

export default Page;
