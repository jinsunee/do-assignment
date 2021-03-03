import React, {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {fetchClassRoom, fetchUserType} from '../apis/fetch';

import Spinner from 'react-native-spinkit';
import SplashScreen from 'react-native-splash-screen';
import styled from '@emotion/native';
import useAssignments from '../hooks/useAssignments';
import useClassRoom from '../hooks/useClassRoom';
import useUser from '../hooks/useUser';

interface Props {
  children?: React.ReactChild;
}

function AuthHandler({children}: Props) {
  const {user, setUser, resetUser} = useUser();
  const {setClassRoom, resetClassRoom} = useClassRoom();
  const {resetAssignments} = useAssignments();

  const [loading, setLoading] = useState<boolean>(true);

  async function onAuthStateChanged(
    firebaseUser: FirebaseAuthTypes.User | null,
  ) {
    if (!firebaseUser) {
      resetUser();
      resetClassRoom();
      resetAssignments();
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
    setTimeout(function hideSplash() {
      SplashScreen.hide();
    }, 2000);

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (user?.displayName && user?.emailVerified) {
      requestClassRoom(user.uid);
    }
  }, [user]);

  const requestClassRoom = async (userUID: string) => {
    setLoading(true);
    const result = await fetchClassRoom(userUID);

    if (result) {
      setClassRoom(result);
    }
    setLoading(false);
  };

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
