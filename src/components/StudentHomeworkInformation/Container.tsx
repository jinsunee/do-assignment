import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {Alert} from 'react-native';
import Layout from './Layout';
import {StackParamList} from '../../navigation/StudentStackNavigator';
import {SubmitAnswersType} from '../../types';
import {fetchQuestions} from '../../apis/fetch';
import {insertStartAssignment} from '../../apis/insert';
import useUser from '../../hooks/useUser';

function Page(): React.ReactElement {
  const route = useRoute<
    RouteProp<StackParamList, 'StudentHomeworkInformation'>
  >();

  const {assignment, classRoomUID} = route.params;

  const navigation = useNavigation();
  const {user} = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStart, setLoadingStart] = useState<boolean>(false);
  const [questions, setQuestions] = useState<SubmitAnswersType[]>();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    setLoading(true);

    const result = await fetchQuestions(classRoomUID, assignment.assignmentUID);

    if (result) {
      setQuestions(result);
    }
    setLoading(false);
  };

  const goToForm = async () => {
    // await insertStartAssignment(
    //   classRoomUID,
    //   assignment.assignmentUID,
    //   user?.uid || '',
    //   user?.displayName || '',
    // );
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'StudentHomeworkForm',
            params: {
              classRoomUID,
              assignment,
              questions,
            },
          },
        ],
      }),
    );
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

  return (
    <Layout
      onPressGetStarted={onPressGetStarted}
      loading={loading}
      loadingStart={loadingStart}
      item={assignment}
      questionsSize={questions?.length || 0}
    />
  );
}

export default Page;
