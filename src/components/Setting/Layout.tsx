import {Header} from '../../shared';
import {HeaderElementType} from '../../types';
import React from 'react';
import styled from '@emotion/native';

function Layout(): React.ReactElement {
  const leftElements: HeaderElementType[] = [
    {
      key: '자주학원 코딩선생님 박진선',
      element: <Title>자주학원 코딩선생님 박진선</Title>,
      onPressElement: () => console.log(),
    },
  ];

  return (
    <Container>
      <Header leftElements={leftElements} />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  line-height: 21px;
  color: ${({theme}) => theme.font};
`;

export default Layout;
