import React from 'react';
import RootNavigator from './navigation/RootStackNavigator';
import RootProvider from './providers';

function App(): React.ReactElement {
  return (
    <RootProvider>
      <RootNavigator />
    </RootProvider>
  );
}

export default App;
