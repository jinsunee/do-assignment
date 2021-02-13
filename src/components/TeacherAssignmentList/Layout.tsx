import {AssingmentItemType, HeaderElementType} from '../../types';
import {SvgFilter, SvgPlus2} from '../../utils/Icons';

import {AssignmentItem} from '../../shared';
import {Header} from '../../shared';
import React from 'react';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';
import useTheme from '../../hooks/useTheme';

interface Props {
  items?: AssingmentItemType[];
  onPressAddButton: () => void;
}

function Layout(props: Props): React.ReactElement {
  const {items, onPressAddButton} = props;
  const {theme} = useTheme();

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
      element: <SvgFilter fill={theme.font} />,
      onPressElement: () => console.log(),
    },
  ];

  const renderAssignments = (): React.ReactElement[] | React.ReactElement => {
    if (items) {
      const elements = items.map((item) => (
        <AssignmentItem key={item.key} item={item} />
      ));

      return (
        <>
          <Wrapper>{elements}</Wrapper>
          <PlusButton onPress={onPressAddButton}>
            <SvgPlus2 />
          </PlusButton>
        </>
      );
    }

    return (
      <EmptyWrapper>
        <EmptyItemsText>새로운 과제를 추가해보세요 :)</EmptyItemsText>
        <EmptyAddAssignmentButton onPress={onPressAddButton}>
          <EmptyAddAssignmentText>과제추가하기</EmptyAddAssignmentText>
        </EmptyAddAssignmentButton>
      </EmptyWrapper>
    );
  };

  return (
    <Container>
      <Header leftElements={leftElements} rightElements={rightElements} />
      {renderAssignments()}
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

const EmptyWrapper = styled.View`
  padding: 50px 15px 15px 15px;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.ScrollView`
  padding: 5px 15px;
`;

const PlusButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 20px;
  bottom: 40px;
  background-color: ${({theme}) => theme.primary};
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

const EmptyItemsText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.blueGrey};
  margin-bottom: 20px;
`;

const EmptyAddAssignmentButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({theme}) => theme.primary};
  padding: 15px;
`;

const EmptyAddAssignmentText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({theme}) => theme.primary};
`;

export default Layout;
