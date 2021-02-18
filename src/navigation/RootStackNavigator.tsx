import {
  AssingmentItemType,
  StudentSubmitStatusType,
  ThemeType,
  UpdateInfromationScreenType,
  UserType,
} from '../types';
import {
  StackNavigationProp,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';

import AuthStack from './AuthStackNavigator';
import EditHomework from '../components/EditHomework';
import FirstStack from './FirstStackNavigator';
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
import auth from '@react-native-firebase/auth';
import useTheme from '../hooks/useTheme';
import useUser from '../hooks/useUser';

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
  const {user} = useUser();

  const renderStackElement = (): React.ReactElement => {
    if (!user || !user.emailVerified) {
      return (
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{
            animationEnabled: false,
          }}
        />
      );
    }

    if (!user?.displayName) {
      return (
        <Stack.Screen
          name="FirstStack"
          component={FirstStack}
          options={{
            animationEnabled: false,
          }}
        />
      );
    }

    if (user?.userType === UserType.TEACHER) {
      return (
        <Stack.Screen
          name="TeacherBottomTab"
          component={TeacherBottomTab}
          options={{
            animationEnabled: false,
          }}
        />
      );
    }

    return (
      <Stack.Screen
        name="StudentStack"
        component={StudentStack}
        options={{
          animationEnabled: false,
        }}
      />
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
