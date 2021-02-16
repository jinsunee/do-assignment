import {AssingmentItemType, HeaderElementType} from '../../types';
import {SvgFilter, SvgSetting} from '../../utils/Icons';

import {AssignmentItem} from '../../shared';
import {Header} from '../../shared';
import React from 'react';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';
import useTheme from '../../hooks/useTheme';

interface Props {
  items?: AssingmentItemType[];
  onPressSetting: () => void;
}

function Layout(props: Props): React.ReactElement {
  const {items, onPressSetting} = props;
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
    {
      key: 'setting button',
      element: <SvgSetting fill={theme.font} />,
      onPressElement: onPressSetting,
    },
  ];

  const renderAssignments = (): React.ReactElement[] | React.ReactElement => {
    if (items) {
      const elements = items.map((item) => (
        <AssignmentItem key={item.key} item={item} />
      ));

      return (
        <>
          <Wrapper showsVerticalScrollIndicator={false}>{elements}</Wrapper>
        </>
      );
    }

    return (
      <EmptyWrapper>
        <EmptyItemsText>새로운 과제가 없어요 !</EmptyItemsText>
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

const EmptyItemsText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.blueGray[0]};
  margin-bottom: 20px;
`;

export default Layout;
