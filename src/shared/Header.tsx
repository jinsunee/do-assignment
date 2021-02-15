import {HeaderElementType} from '../types';
import React from 'react';
import {SvgBack} from '../utils/Icons';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useTheme from '../hooks/useTheme';

interface Props {
  leftElements?: HeaderElementType[];
  rightElements?: HeaderElementType[];
}

function Header(props: Props): React.ReactElement {
  const {leftElements, rightElements} = props;

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {theme} = useTheme();

  const goBack = () => {
    navigation.goBack();
  };

  const renderLeftElements = (): React.ReactElement[] | React.ReactElement => {
    if (leftElements) {
      return leftElements.map((el) => {
        const {key, element, onPressElement} = el;
        return (
          <IconButton key={key} onPress={onPressElement}>
            {element}
          </IconButton>
        );
      });
    }

    return (
      <IconButton onPress={goBack}>
        <SvgBack fill={theme.font} />
      </IconButton>
    );
  };

  const renderRightElements = (): React.ReactElement[] | null => {
    return (
      rightElements?.map((el) => {
        const {key, element, onPressElement} = el;

        return (
          <IconButton key={key} onPress={onPressElement}>
            {element}
          </IconButton>
        );
      }) || null
    );
  };

  return (
    <Container paddingTop={insets.top}>
      <LeftWrapper>{renderLeftElements()}</LeftWrapper>
      <RightWrapper>{renderRightElements()}</RightWrapper>
    </Container>
  );
}

const Container = styled.View<{
  paddingTop: number;
}>`
  flex-direction: row;
  padding: ${({paddingTop}) => paddingTop + 15}px 15px 15px 15px;
  margin: 0px 5px;
  justify-content: space-between;
`;

const LeftWrapper = styled.View``;

const RightWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const IconButton = styled.TouchableOpacity`
  padding: 15px;
  justify-content: center;
  align-items: center;
`;

export default Header;
