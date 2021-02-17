import AuthHandler from './handler/AuthHandler';
import React from 'react';
import RootNavigator from './navigation/RootStackNavigator';
import RootProvider from './providers';

function App(): React.ReactElement {
  return (
    <RootProvider>
      <AuthHandler>
        <RootNavigator />
      </AuthHandler>
    </RootProvider>
  );
}

export default App;
