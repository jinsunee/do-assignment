import React, {FC} from 'react';
import {
  StackNavigationProps,
  StackParamList,
} from '../../navigation/RootStackNavigator';

import {RouteProp} from '@react-navigation/core';
import {WebView} from 'react-native-webview';
import styled from '@emotion/native';

interface Props {
  navigation: StackNavigationProps<'WebView'>;
  route: RouteProp<StackParamList, 'WebView'>;
}

const Page: FC<Props> = ({
  route: {
    params: {uri},
  },
}) => {
  return (
    <Container>
      <WebView source={{uri}} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}): string => theme.background};
`;

export default Page;
