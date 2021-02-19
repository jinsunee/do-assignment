import {AssignmentStatus, UserType} from '../../types';
import React, {useEffect, useState} from 'react';

import {Assignment} from '../../types';
import Layout from './Layout';
import {fetchAssignmentStudent} from '../../apis/fetch';
import useClassRoom from '../../hooks/useClassRoom';
import {useNavigation} from '@react-navigation/native';
import useUser from '../../hooks/useUser';

function Page(): React.ReactElement {
  const navigation = useNavigation();
  const {classRoom} = useClassRoom();
  const {user} = useUser();

  const [loading, setLoading] = useState<boolean>();
  const [items, setItems] = useState<Assignment[]>();

  const fetchItems = async () => {
    setLoading(true);

    const result = await fetchAssignmentStudent(
      classRoom?.classRoomUID || '',
      user?.uid || '',
    );

    console.log('studentMain', result);

    if (result) {
      setItems(result);
    }

    setLoading(true);
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToSetting = () => {
    if (navigation) {
      navigation.navigate('Setting', {userType: UserType.STUDENT});
    }
  };

  return <Layout items={items} onPressSetting={goToSetting} />;
}

export default Page;
