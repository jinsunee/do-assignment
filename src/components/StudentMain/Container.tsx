import {AssignmentStatus, UserType} from '../../types';
import React, {useEffect, useState} from 'react';

import {AssingmentItemType} from '../../types';
import Layout from './Layout';
import {assignmentsDummy} from '../../../assets/dummy/assignments';
import {useNavigation} from '@react-navigation/native';

function Page(): React.ReactElement {
  const navigation = useNavigation();

  const [loading, setLoading] = useState<boolean>();
  const [items, setItems] = useState<AssingmentItemType[]>();

  const fetchItems = () => {
    setLoading(true);
    const onPressElement = (assignmentStatus: AssignmentStatus) => {
      if (assignmentStatus === AssignmentStatus.NOT_YET) {
        goToStudentHomeworkForm();
        return;
      }

      goToHomeworkResult(assignmentStatus);
    };

    const tmpItems: AssingmentItemType[] | undefined = assignmentsDummy.map(
      (item) => {
        return {
          ...item,
          onPressElement: () => onPressElement(item.status),
        };
      },
    );

    setItems(tmpItems);
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToHomeworkResult = (assignmentStatus: AssignmentStatus) => {
    if (navigation) {
      navigation.navigate('HomeworkResult', {
        assignmentStatus,
      });
    }
  };

  const goToStudentHomeworkForm = () => {
    if (navigation) {
      navigation.navigate('StudentHomeworkInformation');
    }
  };

  const goToSetting = () => {
    if (navigation) {
      navigation.navigate('Setting', {userType: UserType.STUDENT});
    }
  };

  return <Layout items={items} onPressSetting={goToSetting} />;
}

export default Page;
