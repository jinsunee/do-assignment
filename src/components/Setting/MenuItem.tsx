import React from 'react';
import {SettingMenuItemType} from '../../types';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';

interface Props {
  item: SettingMenuItemType;
}

function MenuItem(props: Props) {
  const {
    item: {leftString, rightString = '', onPressMenuItem},
  } = props;

  return (
    <Container onPress={onPressMenuItem}>
      <LeftText>{leftString}</LeftText>
      <RightText>{rightString}</RightText>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray[0]};
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
`;

const LeftText = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.font};
`;

const RightText = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.font};
`;

export default MenuItem;
