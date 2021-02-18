import React, {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import Spinner from 'react-native-spinkit';
import {fetchUserType} from '../apis/fetch';
import styled from '@emotion/native';
import useUser from '../hooks/useUser';

interface Props {
  children?: React.ReactChild;
}

function AuthHandler({children}: Props) {
  const {setUser, resetUser} = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  async function onAuthStateChanged(firebaseUser: FirebaseAuthTypes.User) {
    setLoading(true);
    if (!firebaseUser) {
      resetUser();
      setLoading(false);
      return;
    }

    const result = await fetchUserType(firebaseUser.uid);

    if (result) {
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified,
        displayName: firebaseUser.displayName,
        userType: result,
      });
    } else {
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified,
        displayName: firebaseUser.displayName,
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    // @ts-ignore
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (loading) {
    return (
      <Container>
        <Spinner type={'ThreeBounce'} />
      </Container>
    );
  }

  return <>{children}</>;
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default AuthHandler;
