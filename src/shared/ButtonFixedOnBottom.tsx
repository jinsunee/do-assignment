import {ActivityIndicator, Pressable} from 'react-native';

import React from 'react';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useTheme from '../hooks/useTheme';

interface Props {
  onPressSubmit: () => void;
  loading?: boolean;
}

function ButtonFixedOnButtom(props: Props): React.ReactElement {
  const {onPressSubmit, loading} = props;

  const insets = useSafeAreaInsets();
  const {theme} = useTheme();

  if (loading) {
    return (
      <Container
        style={{paddingBottom: insets.bottom + 20}}
        onPress={onPressSubmit}
        paddingBottom={insets.bottom + 20}>
        <ActivityIndicator size={16} color={theme.background} />
      </Container>
    );
  }

  return (
    <Container
      style={{paddingBottom: insets.bottom + 20}}
      onPress={onPressSubmit}
      paddingBottom={insets.bottom + 20}>
      <StyledText>시작하기</StyledText>
    </Container>
  );
}

const Container = styled(Pressable)<{
  paddingBottom: number;
}>`
  width: 100%;
  flex: 1;
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.primary};
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${({theme}) => theme.background};
`;

export default ButtonFixedOnButtom;
