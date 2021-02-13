import {
  AssignmentStatus,
  AssingmentItemType,
  HeaderElementType,
} from '../../types';

import {AssignmentItem} from '../../shared';
import {Header} from '../../shared';
import React from 'react';
import {SvgFilter} from '../../utils/Icons';
import styled from '@emotion/native';

function Layout(): React.ReactElement {
  const leftElements: HeaderElementType[] = [
    {
      key: '자주학원 코딩선생님 박진선',
      element: <Title>자주학원 코딩선생님 박진선</Title>,
      onPressElement: () => console.log(),
    },
  ];

  const rightElements: HeaderElementType[] = [
    {
      key: 'filter button',
      element: <SvgFilter />,
      onPressElement: () => console.log(),
    },
  ];

  const items: AssingmentItemType[] = [
    {
      key: '수력충전 p13~p20 풀어오기',
      title: '수력충전 p13~p20 풀어오기',
      date: '20.12.10 까지',
      onPressElement: () => console.log(),
      status: AssignmentStatus.DEFAULT,
    },
    {
      key: '수력충전 p13~p20 풀어오기',
      title: '수력충전 p13~p20 풀어오기',
      date: '20.12.10 까지',
      onPressElement: () => console.log(),
      status: AssignmentStatus.DEFAULT,
    },
    {
      key: '수력충전 p13~p20 풀어오기',
      title: '수력충전 p13~p20 풀어오기',
      date: '20.12.10 까지',
      onPressElement: () => console.log(),
      status: AssignmentStatus.DEFAULT,
    },
    {
      key: '수력충전 p13~p20 풀어오기',
      title: '수력충전 p13~p20 풀어오기',
      date: '20.12.10 까지',
      onPressElement: () => console.log(),
      status: AssignmentStatus.DEFAULT,
    },
    {
      key: '수력충전 p13~p20 풀어오기',
      title: '수력충전 p13~p20 풀어오기',
      date: '20.12.10 까지',
      onPressElement: () => console.log(),
      status: AssignmentStatus.DEFAULT,
    },
    {
      key: '수력충전 p13~p20 풀어오기',
      title: '수력충전 p13~p20 풀어오기',
      date: '20.12.10 까지',
      onPressElement: () => console.log(),
      status: AssignmentStatus.DEFAULT,
    },
    {
      key: '수력충전 p13~p20 풀어오기',
      title: '수력충전 p13~p20 풀어오기',
      date: '20.12.10 까지',
      onPressElement: () => console.log(),
      status: AssignmentStatus.DEFAULT,
    },
    {
      key: '수력충전 p13~p20 풀어오기',
      title: '수력충전 p13~p20 풀어오기',
      date: '20.12.10 까지',
      onPressElement: () => console.log(),
      status: AssignmentStatus.DEFAULT,
    },
    {
      key: '수력충전 p13~p20 풀어오기',
      title: '수력충전 p13~p20 풀어오기',
      date: '20.12.10 까지',
      onPressElement: () => console.log(),
      status: AssignmentStatus.DEFAULT,
    },
    {
      key: '수력충전 p13~p20 풀어오기',
      title: '수력충전 p13~p20 풀어오기',
      date: '20.12.10 까지',
      onPressElement: () => console.log(),
      status: AssignmentStatus.DEFAULT,
    },
    {
      key: '수력충전 p13~p20 풀어오기',
      title: '수력충전 p13~p20 풀어오기',
      date: '20.12.10 까지',
      onPressElement: () => console.log(),
      status: AssignmentStatus.DEFAULT,
    },
    {
      key: '수력충전 p13~p20 풀어오기',
      title: '수력충전 p13~p20 풀어오기',
      date: '20.12.10 까지',
      onPressElement: () => console.log(),
      status: AssignmentStatus.DEFAULT,
    },
    {
      key: '수력충전 p13~p20 풀어오기',
      title: '수력충전 p13~p20 풀어오기',
      date: '20.12.10 까지',
      onPressElement: () => console.log(),
      status: AssignmentStatus.DEFAULT,
    },
    {
      key: '수력충전 p13~p20 풀어오기',
      title: '수력충전 p13~p20 풀어오기',
      date: '20.12.10 까지',
      onPressElement: () => console.log(),
      status: AssignmentStatus.DEFAULT,
    },
    {
      key: '수력충전 p13~p20 풀어오기',
      title: '수력충전 p13~p20 풀어오기',
      date: '20.12.10 까지',
      onPressElement: () => console.log(),
      status: AssignmentStatus.DEFAULT,
    },
  ];

  const renderAssignments = (): React.ReactElement[] => {
    return items.map((item) => <AssignmentItem key={item.key} item={item} />);
  };

  return (
    <Container>
      <Header leftElements={leftElements} rightElements={rightElements} />
      <Wrapper>{renderAssignments()}</Wrapper>
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
