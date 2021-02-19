import {Assignment, SubmitAnswersType, UserType} from '../types';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import React from 'react';
import Setting from '../components/Setting';
import StudentHomeworkForm from '../components/StudentHomeworkForm';
import StudentHomeworkInformation from '../components/StudentHomeworkInformation';
import StudentMain from '../components/StudentMain';

export type StackParamList = {
  StudentMain: undefined;
  StudentHomeworkInformation: {
    classRoomUID: string;
    assignment: Assignment;
  };
  StudentHomeworkForm: {
    classRoomUID: string;
    assignment: Assignment;
    questions: SubmitAnswersType[];
  };
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
        name="StudentHomeworkInformation"
        component={StudentHomeworkInformation}
      />
      <Stack.Screen
        name="StudentHomeworkForm"
        component={StudentHomeworkForm}
      />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
}

export default StudentStackNavigator;
