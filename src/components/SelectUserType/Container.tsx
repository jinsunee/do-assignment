import Layout from './Layout';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

function Page(): React.ReactElement {
  const navigation = useNavigation();

  const goToStudent = () => {
    if (navigation) {
      navigation.navigate('FirstStudent');
    }
  };

  const goToTeacher = () => {
    if (navigation) {
      navigation.navigate('FirstTeacher');
    }
  };

  return <Layout goToStudent={goToStudent} goToTeacher={goToTeacher} />;
}

export default Page;
