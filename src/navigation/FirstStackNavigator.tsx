import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import FirstStudent from '../components/FirstStudent';
import FirstTeacher from '../components/FirstTeacher';
import React from 'react';
import SelectUserType from '../components/SelectUserType';

export type StackParamList = {
  SelectUserType: undefined;
  FirstTeacher: undefined;
  FirstStudent: undefined;
};

export type StackNavigationProps<
  T extends keyof StackParamList = 'SelectUserType'
> = StackNavigationProp<StackParamList, T>;

const Stack = createStackNavigator<StackParamList>();

function __StackNavigator(): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SelectUserType" component={SelectUserType} />
      <Stack.Screen name="FirstTeacher" component={FirstTeacher} />
      <Stack.Screen name="FirstStudent" component={FirstStudent} />
    </Stack.Navigator>
  );
}

export default __StackNavigator;
