import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import Layout from './Layout';
import React from 'react';
import {StackParamList} from '../../navigation/RootStackNavigator';

function Page(): React.ReactElement {
  const route = useRoute<RouteProp<StackParamList, 'TeacherHomeworkDetail'>>();
  const {
    assignmentItem: {title, date, description},
  } = route.params;

  return <Layout title={title} date={date} description={description || ''} />;
}

export default Page;
