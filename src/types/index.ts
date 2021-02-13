export * from './user';
export * from './theme';
export * from './alignment';

import React from 'react';
export interface HeaderElementType {
  key: string;
  element: React.ReactElement;
  onPressElement: () => void;
}
