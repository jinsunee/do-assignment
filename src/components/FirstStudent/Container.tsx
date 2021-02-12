import React, {useState} from 'react';

import Layout from './Layout';

function Page(): React.ReactElement {
  const [userName, setUserName] = useState<string>('');
  const [accessCode, setAccessCode] = useState<string>('');

  const [warningUserName, setWarningUserName] = useState<string>('');
  const [warningAccessCode, setWarningAccessCode] = useState<string>('');

  return (
    <Layout
      userName={userName}
      setUserName={setUserName}
      warningUserName={warningUserName}
      accessCode={accessCode}
      setAccessCode={setAccessCode}
      warningAccessCode={warningAccessCode}
    />
  );
}

export default Page;
