import React, {useEffect, useState} from 'react';

import {Assignment} from '../../types';
import Layout from './Layout';
import {UserType} from '../../types';
import {fetchAssignmentStudent} from '../../apis/fetch';
import useClassRoom from '../../hooks/useClassRoom';
import {useNavigation} from '@react-navigation/native';
import useUser from '../../hooks/useUser';

function Page(): React.ReactElement {
  const navigation = useNavigation();
  const {classRoom} = useClassRoom();
  const {user} = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Assignment[]>();

  const fetchItems = async (classRoomUID: string, userUID: string) => {
    setLoading(true);

    const result = await fetchAssignmentStudent(userUID, classRoomUID);

    if (result) {
      setItems(result);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user?.uid && classRoom?.classRoomUID) {
      fetchItems(user.uid, classRoom.classRoomUID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, classRoom]);

  const goToSetting = () => {
    if (navigation) {
      navigation.navigate('Setting', {userType: UserType.STUDENT});
    }
  };

  return (
    <Layout loading={loading} items={items} onPressSetting={goToSetting} />
  );
}

export default Page;
