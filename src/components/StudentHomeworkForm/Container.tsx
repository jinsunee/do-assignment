import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useState} from 'react';

import {Alert} from 'react-native';
import Layout from './Layout';
import {StackParamList} from '../../navigation/StudentStackNavigator';
import {SubmitAnswersType} from '../../types';
import {insertSubmitAnswers} from '../../apis/insert';
import useUser from '../../hooks/useUser';

function Page(): React.ReactElement {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackParamList, 'StudentHomeworkForm'>>();
  const {classRoomUID, assignment, questions} = route.params;

  const {user} = useUser();

  const [submitList, setSubmitList] = useState<SubmitAnswersType[]>(questions);
  const [loading, setLoading] = useState<boolean>(false);

  const _onChangeAnswer = (index: number, text: string) => {
    setSubmitList((prev) => [
      ...prev.slice(0, index),
      {
        ...prev[index],
        submitValue: text,
      },
      ...prev.slice(index + 1),
    ]);
  };

  const requestSubmit = async () => {
    const result = await insertSubmitAnswers(
      classRoomUID,
      assignment.assignmentUID,
      user?.uid || '',
      submitList,
    );

    if (result) {
      goToStudentMain();
    }
  };

  const goToStudentMain = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'StudentMain'}],
      }),
    );
  };

  const pressSubmitAnswers = async () => {
    const isFilledAll = submitList?.some((s) => s.answer === '');

    if (isFilledAll) {
      Alert.alert(
        '확인해줘요',
        '답변이 전부 입력되지 않았어요! 그래도 제출할까요?',
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {text: '제출할래요', onPress: requestSubmit},
        ],
        {cancelable: false},
      );
      return;
    }

    Alert.alert(
      '과제 제출',
      '과제를 제출할까요?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {text: '제출할래요!', onPress: requestSubmit},
      ],
      {cancelable: false},
    );
  };

  return (
    <Layout
      assignment={assignment}
      submitList={submitList}
      loading={loading}
      onPressSubmit={pressSubmitAnswers}
      goToStudentMain={goToStudentMain}
      onChangeAnswer={_onChangeAnswer}
    />
  );
}

export default Page;
