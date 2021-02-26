import {Pressable} from 'react-native';
import React from 'react';
import Spinner from 'react-native-spinkit';
import {colors} from '../utils/theme';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  onPressSubmit: () => void;
  loading?: boolean;
}

function ButtonFixedOnButtom(props: Props): React.ReactElement {
  const {onPressSubmit, loading} = props;

  const insets = useSafeAreaInsets();

  if (loading) {
    return (
      <Container onPress={onPressSubmit} paddingBottom={insets.bottom}>
        <Spinner type={'ThreeBounce'} color={colors.light} />
      </Container>
    );
  }

  return (
    <Container onPress={onPressSubmit} paddingBottom={insets.bottom}>
      <StyledText>시작하기</StyledText>
    </Container>
  );
}

type ContainerStyleProps = {
  paddingBottom: number;
};

const Container = styled(Pressable)<ContainerStyleProps>`
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.primary};
`;

const StyledText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${({theme}) => theme.background};
`;

export default ButtonFixedOnButtom;
