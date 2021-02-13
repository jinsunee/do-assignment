import Layout from './Layout';
import React from 'react';
import {assignmentsDummy as items} from '../../../assets/dummy/assignments';
import {useNavigation} from '@react-navigation/native';

function Page(): React.ReactElement {
  const navigation = useNavigation();
  const goToAddAssignment = () => {
    if (navigation) {
      navigation.navigate('AddAssignment');
    }
  };

  return <Layout onPressAddButton={goToAddAssignment} />;
}

export default Page;
