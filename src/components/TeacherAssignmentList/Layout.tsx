import {Assignment, HeaderElementType} from '../../types';

import {AssignmentItem} from '../../shared';
import {Header} from '../../shared';
import React from 'react';
import {SvgPlus2} from '../../utils/Icons';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';
import useClassRoom from '../../hooks/useClassRoom';

interface Props {
  items?: Assignment[] | null;
  onPressAddButton: () => void;
}

function Layout(props: Props): React.ReactElement {
  const {items, onPressAddButton} = props;
  const {classRoom} = useClassRoom();

  const leftElements: HeaderElementType[] = [
    {
      key: classRoom?.classRoomUID || '',
      element: <Title>{classRoom?.classRoomName || ''}</Title>,
      onPressElement: () => console.log(),
    },
  ];

  // const rightElements: HeaderElementType[] = [
  //   {
  //     key: 'filter button',
  //     element: <SvgFilter fill={theme.font} />,
  //     onPressElement: () => console.log(),
  //   },
  // ];

  const renderAssignments = (): React.ReactElement[] | React.ReactElement => {
    if (!items || items?.length === 0) {
      return (
        <EmptyWrapper>
          <EmptyItemsText>새로운 과제를 추가해보세요 :)</EmptyItemsText>
          <EmptyAddAssignmentButton onPress={onPressAddButton}>
            <EmptyAddAssignmentText>과제추가하기</EmptyAddAssignmentText>
          </EmptyAddAssignmentButton>
        </EmptyWrapper>
      );
    }

    const elements = items?.map((item) => (
      <AssignmentItem key={item.assignmentUID} item={item} />
    ));

    return (
      <>
        <Wrapper>{elements}</Wrapper>
        <PlusButton onPress={onPressAddButton}>
          <SvgPlus2 />
        </PlusButton>
      </>
    );
  };

  return (
    <Container>
      <Header leftElements={leftElements} />
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
  color: ${colors.blueGray[0]};
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
