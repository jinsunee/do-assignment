import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

// import AuthStack from '../navigation/AuthStackNavigator';
import FirstStack from '../navigation/FirstStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import TeacherBottomTab from './TeacherBottomNavigator';
import {ThemeType} from '../types';
import useTheme from '../hooks/useTheme';

export type StackParamList = {
  AuthStack: undefined;
  FirstStack: undefined;
  TeacherBottomTab: undefined;
};

export type StackNavigationProps<
  T extends keyof StackParamList = 'AuthStack'
> = StackNavigationProp<StackParamList, T>;

const Stack = createStackNavigator<StackParamList>();

function RootStackNavigator(): React.ReactElement {
  const {themeContext} = useTheme();
  const renderStackElement = (): React.ReactElement => {
    // return <Stack.Screen name="AuthStack" component={AuthStack} />;
    return (
      <Stack.Screen name="TeacherBottomTab" component={TeacherBottomTab} />
    );
  };

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={
          themeContext === ThemeType.LIGHT ? 'dark-content' : 'light-content'
        }
        backgroundColor={'transparent'}
        translucent={true}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
        {renderStackElement()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStackNavigator;
