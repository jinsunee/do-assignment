import React, {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import Spinner from 'react-native-spinkit';
import {fetchUserType} from '../apis/fetch';
import styled from '@emotion/native';
import useFirebaseUser from '../hooks/useFirebaseUser';

interface Props {
  children?: React.ReactChild;
}

function AuthHandler({children}: Props) {
  const {firebaseUser, setFirebaseUser, resetFirebaseUser} = useFirebaseUser();
  const [loading, setLoading] = useState<boolean>(false);

  async function onAuthStateChanged(user: FirebaseAuthTypes.User) {
    setLoading(true);
    if (!user) {
      resetFirebaseUser();
      setLoading(false);
      return;
    }

    const result = await fetchUserType(user.uid);

    if (result) {
      setFirebaseUser({
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        userType: result,
      });
    } else {
      setFirebaseUser({
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    // @ts-ignore
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    console.log('firebaseUser', firebaseUser);
  }, [firebaseUser]);

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
