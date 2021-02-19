import React from 'react';
import Spinner from 'react-native-spinkit';
import styled from '@emotion/native';

function LoadingScreen(): React.ReactElement {
  return (
    <Container>
      <Spinner type={'ThreeBounce'} />
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.background};
  opacity: 0.7;
  padding-top: 200px;
  align-items: center;
  position: absolute;
  z-index: 99;
`;

export default LoadingScreen;
