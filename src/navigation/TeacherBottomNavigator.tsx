import {
  MaterialBottomTabNavigationProp,
  createMaterialBottomTabNavigator,
} from '@react-navigation/material-bottom-tabs';
import React, {ReactElement} from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {SvgList, SvgSetting, SvgStudentCheck} from '../utils/Icons';

import Setting from '../components/Setting';
import TeacherAssignmentList from '../components/TeacherAssignmentList';
import TeacherStudentList from '../components/TeacherStudentList';
import UpdateInformation from '../components/UpdateInformation';
import {UpdateInfromationScreenType} from '../types';
import {colors} from '../utils/theme';
import useTheme from '../hooks/useTheme';

export type __BottomTabParamList = {
  TeacherAssignmentList: undefined;
  TeacherStudentList: undefined;
  Setting: undefined;
};

export type __BottomTabNavigationProps<
  T extends keyof __BottomTabParamList
> = MaterialBottomTabNavigationProp<__BottomTabParamList, T>;

const Tab = createMaterialBottomTabNavigator<__BottomTabParamList>();

function BottomTab(): ReactElement {
  const {theme} = useTheme();

  const barStyle = {
    backgroundColor: theme.background,
    shadowOpacity: 0,
  };

  return (
    <Tab.Navigator
      activeColor={colors.primary}
      inactiveColor={colors.blueGrey}
      barStyle={barStyle}>
      <Tab.Screen
        name="TeacherAssignmentList"
        component={TeacherAssignmentList}
        options={{
          tabBarLabel: '과제',
          tabBarIcon: ({focused}: {focused: boolean}): React.ReactElement => (
            <SvgList fill={focused ? colors.primary : colors.blueGrey} />
          ),
        }}
      />
      <Tab.Screen
        name="TeacherStudentList"
        component={TeacherStudentList}
        options={{
          tabBarLabel: '학생관리',
          tabBarIcon: ({focused}: {focused: boolean}): React.ReactElement => (
            <SvgStudentCheck
              fill={focused ? colors.primary : colors.blueGrey}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: '설정',
          tabBarIcon: ({focused}: {focused: boolean}): React.ReactElement => (
            <SvgSetting fill={focused ? colors.primary : colors.blueGrey} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export type StackParamList = {
  BottomTab: undefined;
  UpdateInformation: {
    screenType: UpdateInfromationScreenType;
    classRoomUID: string;
  };
};

export type StackNavigationProps<
  T extends keyof StackParamList = 'BottomTab'
> = StackNavigationProp<StackParamList, T>;

const Stack = createStackNavigator<StackParamList>();

function TeacherStackNavigator(): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="UpdateInformation" component={UpdateInformation} />
    </Stack.Navigator>
  );
}

export default TeacherStackNavigator;
