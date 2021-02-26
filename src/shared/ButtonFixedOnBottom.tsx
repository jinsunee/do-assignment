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
      <Container
        onPress={onPressSubmit}
        style={{
          paddingBottom: insets.bottom,
        }}>
        <Wrapper>
          <Spinner type={'ThreeBounce'} color={colors.light} />
        </Wrapper>
      </Container>
    );
  }

  return (
    <Container
      onPress={onPressSubmit}
      style={{
        paddingBottom: insets.bottom,
      }}>
      <Wrapper>
        <StyledText>시작하기</StyledText>
      </Wrapper>
    </Container>
  );
}

const Container = styled(Pressable)`
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: ${({theme}) => theme.primary};
`;

const Wrapper = styled.View`
  height: 60px;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${({theme}) => theme.background};
`;

export default ButtonFixedOnButtom;
