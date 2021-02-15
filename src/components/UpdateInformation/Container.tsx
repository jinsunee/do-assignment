import React, {useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import ClassRoomInformationLayout from './ClassRoomInformationLayout';
import ProfileLayout from './ProfileLayout';
import {StackParamList} from '../../navigation/TeacherBottomNavigator';
import {UpdateInfromationScreenType} from '../../types';

function Page(): React.ReactElement {
  const navigation = useNavigation();
  const {
    params: {screenType, classRoomUID},
  } = useRoute<RouteProp<StackParamList, 'UpdateInformation'>>();

  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [warningUserName, setWarningUserName] = useState<string>('');

  const [classRoomName, setClassRoomName] = useState<string>('');
  const [warningClassRoomName, setWarningClassRoomName] = useState<string>('');

  const [accessCode, setAccessCode] = useState<string>('');
  const [warningAccessCode, setWarningAccessCode] = useState<string>('');

  const goBack = () => {
    if (navigation) {
      navigation.goBack();
    }
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
        onPressSubmit={() => console.log(123)}
      />
    );
  }

  return (
    <ProfileLayout
      loading={loading}
      userName={userName}
      setUserName={setUserName}
      warningUserName={warningUserName}
      onPressSubmit={() => console.log(123)}
    />
  );
}

export default Page;
