import React, {useState} from 'react';

import Layout from './Layout';

// import {RootStackNavigationProps} from '../navigation/RootStackaNavigator';

function Page(): React.ReactElement {
  const [userName, setUserName] = useState<string>('');
  const [classRoomName, setClassRoomName] = useState<string>('');
  const [accessCode, setAccessCode] = useState<string>('');
  const [warningUserName, setWarningUserName] = useState<string>('');
  const [warningClassRoomName, setWarningClassRoomName] = useState<string>('');
  const [warningAccessCode, setWarningAccessCode] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const requestSubmit = () => {};

  return (
    <Layout
      userName={userName}
      setUserName={setUserName}
      classRoomName={classRoomName}
      setClassRoomName={setClassRoomName}
      accessCode={accessCode}
      setAccessCode={setAccessCode}
      warningUserName={warningUserName}
      warningClassRoomName={warningClassRoomName}
      warningAccessCode={warningAccessCode}
      loadingSubmit={loading}
      onPressButton={requestSubmit}
    />
  );
}

export default Page;
