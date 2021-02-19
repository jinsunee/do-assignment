import React, {useEffect, useState} from 'react';

import Layout from './Layout';
import {fetchAssignmentTeacher} from '../../apis/fetch';
import useAssignment from '../../hooks/useAssignment';
import useClassroom from '../../hooks/useClassRoom';
import {useNavigation} from '@react-navigation/native';

function Page(): React.ReactElement {
  const navigation = useNavigation();
  const {assignment, setAssignments} = useAssignment();
  const {classRoom} = useClassroom();

  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);

    const result = await fetchAssignmentTeacher(classRoom?.classRoomUID || '');

    if (result) {
      setAssignments(result);
    }
  };

  const goToEditHomework = () => {
    if (navigation) {
      navigation.navigate('EditHomework');
    }
  };

  return <Layout onPressAddButton={goToEditHomework} items={assignment} />;
}

export default Page;
