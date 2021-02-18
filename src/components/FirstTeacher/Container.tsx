import React, {useState} from 'react';

import Layout from './Layout';
import {UserType} from '../../types';
import {fetchAccessCodeSize} from '../../apis/fetch';
import {insertTeacher} from '../../apis/insert';
import useUser from '../../hooks/useUser';

function Page(): React.ReactElement {
  const {user, setUser} = useUser();

  const [userName, setUserName] = useState<string>('');
  const [classRoomName, setClassRoomName] = useState<string>('');
  const [accessCode, setAccessCode] = useState<string>('');
  const [warningUserName, setWarningUserName] = useState<string>('');
  const [warningClassRoomName, setWarningClassRoomName] = useState<string>('');
  const [warningAccessCode, setWarningAccessCode] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const requestSubmit = async () => {
    try {
      if (!user) {
        return;
      }

      if (!userName || userName.length <= 1) {
        setWarningUserName('2글자 이상의 이름을 입력해주세요');
        return;
      }

      if (!classRoomName || classRoomName.length <= 3) {
        setWarningClassRoomName('3글자 이상의 클래스 이름을 입력해주세요');
        return;
      }

      setLoading(true);

      const accessCodeSize = await fetchAccessCodeSize(accessCode);
      if (accessCodeSize) {
        setWarningAccessCode('다른코드를 입력해주세요 :)');
        setLoading(false);
        return;
      }

      const result = await insertTeacher(
        user.uid,
        userName,
        user.email || '',
        classRoomName,
        accessCode,
      );

      if (result) {
        setUser({
          ...user,
          displayName: userName,
          userType: UserType.TEACHER,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
