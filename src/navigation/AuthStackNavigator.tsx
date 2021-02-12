import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import AuthMail from '../components/AuthMail';
import AuthMain from '../components/AuthMain';
import React from 'react';
import VerifyEmail from '../components/VerifyEmail';

export type StackParamList = {
  AuthMain: undefined;
  AuthMail: undefined;
  VerifyEmail: undefined;
};

export type StackNavigationProps<
  T extends keyof StackParamList = 'AuthMain'
> = StackNavigationProp<StackParamList, T>;

const Stack = createStackNavigator<StackParamList>();

function AuthStackNavigator(): React.ReactElement {
  // const { theme } = useThemeContext();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
      <Stack.Screen name="AuthMain" component={AuthMain} />
      <Stack.Screen name="AuthMail" component={AuthMail} />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
