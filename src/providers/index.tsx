import {combineReducers, createStore} from 'redux';

import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {Provider} from 'react-redux';
import React from 'react';
import {RootSiblingParent} from 'react-native-root-siblings';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemeProvider from './themeProvider';
import {userReducer} from './/userProvider';

const rootReducer = combineReducers({
  userReducer,
});

const store = createStore(rootReducer);

interface Props {
  children?: React.ReactChild;
}

function RootProvider({children}: Props) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaProvider>
          <ActionSheetProvider>
            <RootSiblingParent>{children}</RootSiblingParent>
          </ActionSheetProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default RootProvider;

export type RootState = ReturnType<typeof rootReducer>;
