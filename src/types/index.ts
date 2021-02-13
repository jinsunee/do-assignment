export * from './user';
export * from './theme';
export * from './alignment';

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

export interface StudentListItemType {
  studentUID: string;
  studentName: string;
}

export enum ModeType {
  TIME = 'time',
  DATE = 'date',
  DATE_TIME = 'datetime',
  COUNTDOWN = 'countdown',
}
