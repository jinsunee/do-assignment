import React, {useEffect, useState} from 'react';

import {AssingmentItemType} from '../../types';
import Layout from './Layout';
import {assignmentsDummy as items} from '../../../assets/dummy/assignments';
import {useNavigation} from '@react-navigation/native';

function Page(): React.ReactElement {
  const navigation = useNavigation();

  const [assignmentItems, setAssignmentItems] = useState<
    AssingmentItemType[]
  >();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    const tmp: AssingmentItemType[] = items.map((item) => ({
      ...item,
      onPressElement: () =>
        goToHomeworkDetail({
          assignmentItem: item,
        }),
    }));

    setAssignmentItems(tmp);
  };

  const goToEditHomework = () => {
    if (navigation) {
      navigation.navigate('EditHomework');
    }
  };

  const goToHomeworkDetail = (params: Record<string, AssingmentItemType>) => {
    navigation?.navigate('TeacherHomeworkDetail', params);
  };

  return <Layout onPressAddButton={goToEditHomework} items={assignmentItems} />;
}

export default Page;
