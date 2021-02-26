import {TextStyle, ViewStyle} from 'react-native';

import React from 'react';
import Spinner from 'react-native-spinkit';
import {colors} from '../utils/theme';
import styled from '@emotion/native';

interface Props {
  value: string;
  loading?: boolean;
  onPressButton?: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

function Shared(props: Props): React.ReactElement {
  const {
    value = 'Button!',
    loading = false,
    onPressButton,
    containerStyle,
    textStyle,
  } = props;

  if (loading) {
    return (
      <Container onPress={onPressButton} style={containerStyle}>
        <Spinner type={'ThreeBounce'} color={colors.light} />
      </Container>
    );
  }
  return (
    <Container onPress={onPressButton} style={containerStyle}>
      <StyledText style={textStyle}>{value}</StyledText>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  flex: 1;
  height: 56px;
  background-color: ${({theme}) => theme.primary};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const StyledText = styled.Text`
  color: ${({theme}) => theme.background};
  font-weight: 500;
  font-size: 16px;
`;

export default Shared;
