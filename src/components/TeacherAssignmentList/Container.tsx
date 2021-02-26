import React, {useEffect, useState} from 'react';

import Layout from './Layout';
import {fetchAssignmentTeacher} from '../../apis/fetch';
import useAssignments from '../../hooks/useAssignments';
import useClassroom from '../../hooks/useClassRoom';
import {useNavigation} from '@react-navigation/native';

function Page(): React.ReactElement {
  const navigation = useNavigation();
  const {assignments, setAssignments} = useAssignments();
  const {classRoom} = useClassroom();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (classRoom?.classRoomUID) {
      fetchItems(classRoom.classRoomUID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classRoom]);

  const fetchItems = async (classRoomUID: string) => {
    setLoading(true);

    const result = await fetchAssignmentTeacher(classRoomUID);

    if (result) {
      setAssignments(result);
    }
    setLoading(false);
  };

  const goToEditHomework = () => {
    if (navigation) {
      navigation.navigate('EditHomework');
    }
  };

  return (
    <Layout
      onPressAddButton={goToEditHomework}
      items={assignments}
      loading={loading}
    />
  );
}

export default Page;
