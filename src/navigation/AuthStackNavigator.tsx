import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import AuthMail from '../components/AuthMail';
import AuthMain from '../components/AuthMain';
import React from 'react';
import VerifyEmail from '../components/VerifyEmail';

export type AuthStackParamList = {
  AuthMain: undefined;
  AuthMail: undefined;
  VerifyEmail: undefined;
};

export type StackNavigationProps<
  T extends keyof AuthStackParamList = 'AuthMain'
> = StackNavigationProp<AuthStackParamList, T>;

const AuthStack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator(): React.ReactElement {
  // const { theme } = useThemeContext();
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="VerifyEmail" component={VerifyEmail} />
      <AuthStack.Screen name="AuthMain" component={AuthMain} />
      <AuthStack.Screen name="AuthMail" component={AuthMail} />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;