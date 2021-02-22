import React from 'react';
import Spinner from 'react-native-spinkit';
import styled from '@emotion/native';

interface Props {
  opacity?: number;
}

function LoadingScreen(props: Props): React.ReactElement {
  return (
    <Container opacity={props.opacity}>
      <Spinner type={'ThreeBounce'} />
    </Container>
  );
}

type ContainerStyleProps = {
  opacity?: number;
};

const Container = styled.View<ContainerStyleProps>`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.background};
  opacity: ${({opacity}) => opacity || 0.7};
  padding-top: 200px;
  align-items: center;
  position: absolute;
  z-index: 99;
`;

export default LoadingScreen;
