import React, {useState} from 'react';

import Layout from './Layout';
import {UserType} from '../../types';
import {confirmAccessCode} from '../../apis/fetch';
import {insertStudent} from '../../apis/insert';
import useUser from '../../hooks/useUser';

function Page(): React.ReactElement {
  const {user, setUser} = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [accessCode, setAccessCode] = useState<string>('');

  const [warningUserName, setWarningUserName] = useState<string>('');
  const [warningAccessCode, setWarningAccessCode] = useState<string>('');

  const requestSubmit = async () => {
    if (!user) {
      return;
    }

    setLoading(true);

    if (!userName) {
      setWarningUserName('이름을 입력해주세요.');
      setLoading(false);
      return;
    }

    if (!accessCode) {
      setWarningAccessCode('접속코드를 입력해주세요.');
      setLoading(false);
      return;
    }

    const classRoomUID = await confirmAccessCode(accessCode);
    if (!classRoomUID) {
      setWarningAccessCode('정확한 접속코드를 입력해주세요.');
      setLoading(false);
      return;
    }

    const result = await insertStudent(classRoomUID, userName);

    if (result) {
      setUser({
        ...user,
        displayName: userName,
        userType: UserType.STUDENT,
      });
    }
    setLoading(false);
  };

  return (
    <Layout
      userName={userName}
      setUserName={setUserName}
      warningUserName={warningUserName}
      accessCode={accessCode}
      setAccessCode={setAccessCode}
      warningAccessCode={warningAccessCode}
      onPressButton={requestSubmit}
      loading={loading}
    />
  );
}

export default Page;
