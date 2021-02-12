import React from 'react';
import {SvgBack} from '../../utils/Icons';
// import {RootStackNavigationProps} from '../navigation/RootStackaNavigator';
import styled from '@emotion/native';
import useTheme from '../../hooks/useTheme';
import useUserProvider from '../../hooks/useUser';

function Layout(): React.ReactElement {
  const {user} = useUserProvider();
  const {theme, toggleTheme} = useTheme();

  const themeChange = () => {
    toggleTheme();
  };

  return (
    <Container>
      <SvgBack fill={theme.font} />
      <StyledText>redux value :{user.userType}</StyledText>
      <StyledButton onPress={themeChange}>
        <StyledText>Change Theme</StyledText>
      </StyledButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.background};
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.font};
`;

const StyledButton = styled.TouchableOpacity`
  padding: 20px;
  border-width: 1px;
  border-color: ${({theme}) => theme.font};
  border-radius: 10px;
`;

export default Layout;
