import React, {useEffect} from 'react';

import Layout from './Layout';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

async function onAppleButtonPress() {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  const {identityToken, nonce} = appleAuthRequestResponse;

  if (identityToken) {
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    const userCredential = await auth().signInWithCredential(appleCredential);

    console.warn(
      `Firebase authenticated via Apple, UID: ${userCredential.user.uid}`,
    );
  } else {
  }
}

function Page(): React.ReactElement {
  const navigation = useNavigation();

  useEffect(() => {
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
      onPressApple={onAppleButtonPress}
      appleIsSupported={appleAuth.isSupported}
    />
  );
}

export default Page;
