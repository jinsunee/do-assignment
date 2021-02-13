import {
  StackNavigationProp,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';

import AddAssignment from '../components/AddAssignment';
// import AuthStack from '../navigation/AuthStackNavigator';
// import FirstStack from '../navigation/FirstStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import TeacherBottomTab from './TeacherBottomNavigator';
import {ThemeType} from '../types';
import WebView from '../components/WebView';
import useTheme from '../hooks/useTheme';

export type StackParamList = {
  AuthStack: undefined;
  FirstStack: undefined;
  TeacherBottomTab: undefined;
  WebView: undefined;
  AddAssignment: undefined;
};

export type StackNavigationProps<
  T extends keyof StackParamList = 'TeacherBottomTab'
> = StackNavigationProp<StackParamList, T>;

const Stack = createStackNavigator<StackParamList>();

function RootStackNavigator(): React.ReactElement {
  const {themeContext} = useTheme();
  const renderStackElement = (): React.ReactElement => {
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
        }}>
        {renderStackElement()}
        <Stack.Screen name="WebView" component={WebView} />
        <Stack.Screen
          name="AddAssignment"
          component={AddAssignment}
          options={{
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStackNavigator;
