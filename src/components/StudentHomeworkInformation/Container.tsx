import React, {useState} from 'react';

import {Alert} from 'react-native';
import Layout from './Layout';
import {useNavigation} from '@react-navigation/native';

function Page(): React.ReactElement {
  const navigation = useNavigation();

  const [loading, setLoading] = useState<boolean>(false);

  const goToForm = () => {
    if (navigation) {
      navigation.navigate('StudentHomeworkForm');
    }
  };

  const onPressGetStarted = () => {
    Alert.alert(
      '시작하기',
      '한번 시작하면 과제를 다시 시작할 수 없습니다. 바로 시작하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {text: '시작할래요', onPress: goToForm},
      ],
      {cancelable: false},
    );
  };

  return <Layout onPressGetStarted={onPressGetStarted} loading={loading} />;
}

export default Page;
