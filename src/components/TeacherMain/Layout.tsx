import React from 'react';
// import {RootStackNavigationProps} from '../navigation/RootStackaNavigator';
import styled from '@emotion/native';

interface Props {
  value?: string;
}

function Page(props: Props): React.ReactElement {
  const {value} = props;

  return (
    <Container>
      <StyledText>Layout Template</StyledText>
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
