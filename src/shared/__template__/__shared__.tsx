import React from 'react';
import styled from '@emotion/native';

interface Props {
  value: any;
}

function Shared(props: Props): React.ReactElement {
  const {value} = props;

  return (
    <Container>
      <StyledText>123</StyledText>
    </Container>
  );
}

const Container = styled.View`
  background-color: red;
`;

const StyledText = styled.Text`
  color: ${({theme}) => theme.font};
`;

export default Shared;
