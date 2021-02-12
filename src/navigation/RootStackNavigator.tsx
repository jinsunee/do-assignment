import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import FirstMain from '../components/FirstMain';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';

export type StackParamList = {
  default: undefined;
  FirstMain: undefined;
};

export type StackNavigationProps<
  T extends keyof StackParamList = 'default'
> = StackNavigationProp<StackParamList, T>;

const Stack = createStackNavigator<StackParamList>();

function RootStackNavigator(): React.ReactElement {
  // const { theme } = useThemeContext();
  return (
    <NavigationContainer>
      <StatusBar
        // barStyle={theme === ThemeType.LIGHT ? 'dark-content' : 'light-content'}
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <Stack.Navigator
        screenOptions={
          {
            // headerStyle: {
            //   backgroundColor: theme.background,
            // },
            // headerTitleStyle: { color: theme.fontColor },
            // headerTintColor: theme.tintColor,
          }
        }>
        <Stack.Screen name="FirstMain" component={FirstMain} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStackNavigator;
