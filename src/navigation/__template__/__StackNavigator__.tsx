import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import React from 'react';

export type StackParamList = {
  default: undefined;
};

export type StackNavigationProps<
  T extends keyof StackParamList = 'default'
> = StackNavigationProp<StackParamList, T>;

const Stack = createStackNavigator<StackParamList>();

function __StackNavigator(): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={
        {
          // headerShown: false,
        }
      }>
      {/* <Stack.Screen name="Screen" component={Screen} /> */}
    </Stack.Navigator>
  );
}

export default __StackNavigator;
