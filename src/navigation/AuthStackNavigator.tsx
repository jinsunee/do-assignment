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
  VerifyEmail: {
    email: string;
  };
};

export type StackNavigationProps<
  T extends keyof AuthStackParamList = 'AuthMain'
> = StackNavigationProp<AuthStackParamList, T>;

const AuthStack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator(): React.ReactElement {
  return (
    <AuthStack.Navigator
      initialRouteName={'AuthMain'}
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="AuthMain" component={AuthMain} />
      <AuthStack.Screen name="VerifyEmail" component={VerifyEmail} />
      <AuthStack.Screen name="AuthMail" component={AuthMail} />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
