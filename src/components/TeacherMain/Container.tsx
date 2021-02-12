import React from 'react';
// import {RootStackNavigationProps} from '../navigation/RootStackaNavigator';
import styled from '@emotion/native';

function Page(): React.ReactElement {
  return (
    <Container>
      <StyledText>Page</StyledText>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: red;
`;

const StyledText = styled.Text`
  font-size: 16px;
`;

export default Page;
