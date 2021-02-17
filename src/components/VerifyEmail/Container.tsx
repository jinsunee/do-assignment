import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {AuthStackParamList} from '../../navigation/AuthStackNavigator';
import Layout from './Layout';
import React from 'react';

function Page(): React.ReactElement {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<AuthStackParamList, 'VerifyEmail'>>();

  const {email} = route.params;

  const requestResendEmail = async () => {
    try {
      // setLoadingResend(true);
      // await resendVerifyingEmail();
      // Alert.alert('전송 완료!');
      // setLoadingResend(false);
    } catch (error) {
      console.log(error);
    }
  };

  const goToFirstEmail = (): void => {
    if (navigation) {
      navigation.navigate('AuthMain');
    }
  };

  return (
    <Layout
      email={email}
      resendEmail={requestResendEmail}
      goToSignIn={goToFirstEmail}
    />
  );
}

export default Page;
