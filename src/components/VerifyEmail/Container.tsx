import Layout from './Layout';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

function Page(): React.ReactElement {
  const navigation = useNavigation();

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
      navigation.navigate('AuthMail');
    }
  };

  return (
    <Layout resendEmail={requestResendEmail} goToSignIn={goToFirstEmail} />
  );
}

export default Page;
