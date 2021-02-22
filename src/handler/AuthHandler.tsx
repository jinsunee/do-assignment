import React, {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {fetchClassRoom, fetchUserType} from '../apis/fetch';

import Spinner from 'react-native-spinkit';
import SplashScreen from 'react-native-splash-screen';
import styled from '@emotion/native';
import useAssignment from '../hooks/useAssignment';
import useClassRoom from '../hooks/useClassRoom';
import useUser from '../hooks/useUser';

interface Props {
  children?: React.ReactChild;
}

function AuthHandler({children}: Props) {
  const {setUser, resetUser} = useUser();
  const {setClassRoom} = useClassRoom();
  const {assignment} = useAssignment();

  const [loading, setLoading] = useState<boolean>(false);

  async function onAuthStateChanged(firebaseUser: FirebaseAuthTypes.User) {
    setLoading(true);
    if (!firebaseUser) {
      resetUser();
      setLoading(false);
      return;
    }

    const result = await Promise.all([
      await fetchUserType(firebaseUser.uid),
      await fetchClassRoom(firebaseUser.uid),
    ]);

    const userTypeResult = result[0];
    const classRoomResult = result[1];

    if (userTypeResult) {
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified,
        displayName: firebaseUser.displayName,
        userType: userTypeResult,
      });
    } else {
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified,
        displayName: firebaseUser.displayName,
      });
    }

    if (classRoomResult) {
      setClassRoom(classRoomResult);
    }

    setLoading(false);
  }

  useEffect(() => {
    SplashScreen.hide();

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
