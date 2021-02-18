import Layout from './Layout';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import useUser from '../../hooks/useUser';

function Page(): React.ReactElement {
  const navigation = useNavigation();
  const {user} = useUser();

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
      email={user?.email || ''}
      resendEmail={requestResendEmail}
      goToSignIn={goToFirstEmail}
    />
  );
}

export default Page;
