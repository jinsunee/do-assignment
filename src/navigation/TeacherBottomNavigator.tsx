import {
  MaterialBottomTabNavigationProp,
  createMaterialBottomTabNavigator,
} from '@react-navigation/material-bottom-tabs';
import React, {ReactElement} from 'react';
import {SvgList, SvgSetting} from '../utils/Icons';

import Setting from '../components/Setting';
import TeacherAssignmentList from '../components/TeacherAssignmentList';
import {colors} from '../utils/theme';
import useTheme from '../hooks/useTheme';

export type __BottomTabParamList = {
  TeacherAssignmentList: undefined;
  Setting: undefined;
};

export type __BottomTabNavigationProps<
  T extends keyof __BottomTabParamList
> = MaterialBottomTabNavigationProp<__BottomTabParamList, T>;

const Tab = createMaterialBottomTabNavigator<__BottomTabParamList>();

function TeacherBottomNavigator(): ReactElement {
  const {theme} = useTheme();

  const barStyle = {
    backgroundColor: theme.background,
    shadowOpacity: 0,
  };

  return (
    <Tab.Navigator
      activeColor={colors.primary}
      inactiveColor={colors.blueGray[0]}
      barStyle={barStyle}>
      <Tab.Screen
        name="TeacherAssignmentList"
        component={TeacherAssignmentList}
        options={{
          tabBarLabel: '과제',
          tabBarIcon: ({focused}: {focused: boolean}): React.ReactElement => (
            <SvgList fill={focused ? colors.primary : colors.blueGray[0]} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: '설정',
          tabBarIcon: ({focused}: {focused: boolean}): React.ReactElement => (
            <SvgSetting fill={focused ? colors.primary : colors.blueGray[0]} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TeacherBottomNavigator;
