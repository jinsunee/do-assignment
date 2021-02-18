export * from './user';
export * from './theme';
export * from './alignment';
export * from './classRoom';

import React from 'react';
import {StackNavigationOptions} from '@react-navigation/stack';
export interface NavigatorType {
  name: string;
  component: any;
  screenOptions?: StackNavigationOptions;
}

export interface HeaderElementType {
  key: string;
  element: React.ReactElement;
  onPressElement: () => void;
}

export enum ModeType {
  TIME = 'time',
  DATE = 'date',
  DATE_TIME = 'datetime',
  COUNTDOWN = 'countdown',
}

export interface SettingMenuItemType {
  key: string;
  leftString: string;
  rightString?: string;
  onPressMenuItem?: () => void;
}

export enum UpdateInfromationScreenType {
  PROFILE = 'profile',
  CLASS_INFORMATION = 'class information',
}
