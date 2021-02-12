import React from 'react';
import {SvgBack} from '../utils/Icons';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useTheme from '../hooks/useTheme';

interface Props {
  value?: any;
}

function NavigationBar(props: Props): React.ReactElement {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {theme} = useTheme();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Container paddingTop={insets.top}>
      <BackButton onPress={goBack}>
        <SvgBack fill={theme.font} />
      </BackButton>
    </Container>
  );
}

const Container = styled.View<{
  paddingTop: number;
}>`
  flex-direction: row;
  padding: ${({paddingTop}) => paddingTop + 15}px 15px 15px 15px;
`;

const BackButton = styled.TouchableOpacity`
  padding: 15px;
`;

export default NavigationBar;
