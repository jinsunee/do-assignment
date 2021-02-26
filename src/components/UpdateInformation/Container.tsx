import React, {useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  updateClassRoomInformation,
  updateUserInformation,
} from '../../apis/update';

import ClassRoomInformationLayout from './ClassRoomInformationLayout';
import ProfileLayout from './ProfileLayout';
import {StackParamList} from '../../navigation/RootStackNavigator';
import {UpdateInfromationScreenType} from '../../types';
import useClassName from '../../hooks/useClassRoom';
import useUser from '../../hooks/useUser';
import {validateAccessCode} from '../../apis/fetch';

function Page(): React.ReactElement {
  const navigation = useNavigation();
  const {
    params: {screenType, classRoomUID},
  } = useRoute<RouteProp<StackParamList, 'UpdateInformation'>>();

  const {user, setUser} = useUser();
  const {classRoom, setClassRoom} = useClassName();

  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(user?.displayName || '');
  const [warningUserName, setWarningUserName] = useState<string>('');

  const [classRoomName, setClassRoomName] = useState<string>(
    classRoom?.classRoomName || '',
  );
  const [warningClassRoomName, setWarningClassRoomName] = useState<string>('');

  const [accessCode, setAccessCode] = useState<string>(
    classRoom?.accessCode || '',
  );
  const [warningAccessCode, setWarningAccessCode] = useState<string>('');

  const goBack = () => {
    navigation.goBack();
  };

  const requestUpdateClassInformation = async () => {
    setLoading(true);

    if (!classRoomName) {
      setWarningUserName('다른 이름을 입력해주세요.');
      setWarningClassRoomName('');
      setLoading(false);
      return;
    }

    const validate = await validateAccessCode(accessCode);

    if (accessCode !== classRoom?.accessCode && !validate) {
      setWarningAccessCode('다른 접속코드를 입력해주세요.');
      setWarningClassRoomName('');
      setLoading(false);
      return;
    }

    const result = await updateClassRoomInformation(
      classRoomUID,
      classRoomName,
      accessCode,
    );

    if (result) {
      setClassRoom({
        classRoomUID,
        classRoomName,
        accessCode,
      });
      goBack();
    }

    setLoading(false);
  };

  const requestUpdateUserInformation = async () => {
    setLoading(true);

    if (userName === user?.displayName) {
      setWarningUserName('이전과 같은 이름입니다.');
      return;
    }

    const result = await updateUserInformation(user?.uid || '', userName);

    if (result && user) {
      setUser({
        ...user,
        displayName: userName,
      });
      goBack();
    }

    setLoading(false);
  };

  if (screenType === UpdateInfromationScreenType.CLASS_INFORMATION) {
    return (
      <ClassRoomInformationLayout
        loading={loading}
        classRoomName={classRoomName}
        setClassRoomName={setClassRoomName}
        warningClassRoomName={warningClassRoomName}
        accessCode={accessCode}
        setAccessCode={setAccessCode}
        warningAccessCode={warningAccessCode}
        onPressSubmit={requestUpdateClassInformation}
      />
    );
  }

  return (
    <ProfileLayout
      loading={loading}
      userName={userName}
      setUserName={setUserName}
      warningUserName={warningUserName}
      onPressSubmit={requestUpdateUserInformation}
    />
  );
}

export default Page;
