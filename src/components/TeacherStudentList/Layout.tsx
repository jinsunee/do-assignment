import {HeaderElementType, StudentListItemType} from '../../types';

import {ActivityIndicator} from 'react-native';
import {Header} from '../../shared';
import React from 'react';
import StudentItem from './StudentItem';
import styled from '@emotion/native';

interface Props {
  loading: boolean;
  items?: StudentListItemType[] | null;
}

function Layout(props: Props): React.ReactElement {
  const {loading, items} = props;
  const leftElements: HeaderElementType[] = [
    {
      key: '자주학원 코딩선생님 박진선',
      element: <Title>자주학원 코딩선생님 박진선</Title>,
      onPressElement: () => console.log(),
    },
  ];

  const renderStudentList = (): React.ReactElement[] | React.ReactElement => {
    if (loading || !items) {
      return <ActivityIndicator />;
    }

    return (
      <Wrapper>
        {items.map((item) => (
          <StudentItem key={item.studentUID} item={item} />
        ))}
      </Wrapper>
    );
  };

  return (
    <Container>
      <Header leftElements={leftElements} />
      {renderStudentList()}
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

const Wrapper = styled.ScrollView`
  padding: 5px 15px;
`;

export default Layout;
