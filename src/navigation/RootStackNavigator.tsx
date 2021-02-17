import {
  AssignmentStatus,
  AssingmentItemType,
  StudentListItemType,
  StudentSubmitStatusType,
  ThemeType,
  UpdateInfromationScreenType,
} from '../types';
import {
  StackNavigationProp,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';

import EditHomework from '../components/EditHomework';
import HomeworkResult from '../components/HomeworkResult';
import {NavigationContainer} from '@react-navigation/native';
import {Platform} from 'react-native';
import React from 'react';
import {StatusBar} from 'react-native';
import StudentStack from './StudentStackNavigator';
import {SvgBack} from '../utils/Icons';
import TeacherBottomTab from './TeacherBottomNavigator';
import TeacherHomeworkDetail from '../components/TeacherHomeworkDetail';
import UpdateInformation from '../components/UpdateInformation';
import WebView from '../components/WebView';
import useTheme from '../hooks/useTheme';

export type StackParamList = {
  AuthStack: undefined;
  FirstStack: undefined;
  TeacherBottomTab: undefined;
  StudentStack: undefined;
  WebView: {
    uri: string;
  };
  AddAssignment: undefined;
  UpdateInformation: {
    screenType: UpdateInfromationScreenType;
    classRoomUID: string;
  };
  HomeworkResult: {
    assingmentUID: string;
    studentUID: string;
    studentName: string;
    submitStatus: StudentSubmitStatusType;
  };
  EditHomework: undefined;
  TeacherHomeworkDetail: {
    assignmentItem: AssingmentItemType;
  };
};

export type StackNavigationProps<
  T extends keyof StackParamList = 'TeacherBottomTab'
> = StackNavigationProp<StackParamList, T>;

const Stack = createStackNavigator<StackParamList>();

function RootStackNavigator(): React.ReactElement {
  const {theme, themeContext} = useTheme();
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
        <Stack.Screen
          name="WebView"
          component={WebView}
          options={{
            animationEnabled: true,
            headerShown: true,
            headerStyle: {
              backgroundColor: theme.background,
              borderBottomWidth: 0,
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerTintColor: theme.font,
            title: '개인정보처리방침',
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerBackImage: (): React.ReactElement => (
              <SvgBack fill={theme.font} />
            ),
            headerLeftContainerStyle:
              Platform.OS === 'android' ? {marginLeft: 10} : {marginLeft: 15},
            ...TransitionPresets.DefaultTransition,
          }}
        />
        <Stack.Screen
          name="EditHomework"
          component={EditHomework}
          options={{
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
        <Stack.Screen name="UpdateInformation" component={UpdateInformation} />
        <Stack.Screen name="HomeworkResult" component={HomeworkResult} />
        <Stack.Screen
          name="TeacherHomeworkDetail"
          component={TeacherHomeworkDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStackNavigator;
