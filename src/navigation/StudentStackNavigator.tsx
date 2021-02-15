import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import React from 'react';
import Setting from '../components/Setting';
import StudentHomeworkForm from '../components/StudentHomeworkForm';
import StudentMain from '../components/StudentMain';
import {UserType} from '../types';

export type StackParamList = {
  StudentMain: undefined;
  StudentHomeworkForm: undefined;
  Setting: {
    userType?: UserType;
  };
};

export type StackNavigationProps<
  T extends keyof StackParamList = 'StudentMain'
> = StackNavigationProp<StackParamList, T>;

const Stack = createStackNavigator<StackParamList>();

function StudentStackNavigator(): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="StudentMain" component={StudentMain} />
      <Stack.Screen
        name="StudentHomeworkForm"
        component={StudentHomeworkForm}
      />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
}

export default StudentStackNavigator;
