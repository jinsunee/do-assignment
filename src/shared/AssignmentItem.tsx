import {Assignment, AssignmentStatus, StudentSubmitStatusType} from '../types';

import React from 'react';
import {View} from 'react-native';
import {colors} from '../utils/theme';
import styled from '@emotion/native';
import useClassRooms from '../hooks/useClassRoom';
import {useNavigation} from '@react-navigation/native';
import useUser from '../hooks/useUser';

interface Props {
  item: Assignment;
  onPressItem: () => {};
}

function AssignmentItem(props: Props): React.ReactElement {
  const {
    item: {title, expireDate, status, assignmentUID, submitTime},
  } = props;
  const navigation = useNavigation();
  const {user} = useUser();
  const {classRoom} = useClassRooms();

  console.log('submitTime', submitTime);

  const goToHomeworkDetail = () => {
    if (status === AssignmentStatus.DEFAULT) {
      navigation.navigate('TeacherHomeworkDetail', {
        assignment: props.item,
      });
      return;
    }

    if (status === AssignmentStatus.COMPLETED) {
      navigation.navigate('HomeworkResult', {
        classRoomUID: classRoom?.classRoomUID || '',
        assignmentUID,
        studentUID: user?.uid || '',
        studentName: user?.displayName || '',
        submitStatus: StudentSubmitStatusType.COMPLETED,
        submitTime: submitTime,
      });

      return;
    }

    if (navigation) {
      navigation.navigate('StudentHomeworkInformation', {
        classRoomUID: classRoom?.classRoomUID || '',
        assignment: props.item,
      });
    }
  };

  switch (status) {
    case AssignmentStatus.DEFAULT: {
      return (
        <Container onPress={goToHomeworkDetail}>
          <LeftLine />
          <View>
            <TitleWrapper>
              <Title>{title}</Title>
            </TitleWrapper>
            {expireDate ? (
              <ExpireDate>{`${expireDate?.getFullYear()}/${
                expireDate?.getMonth() + 1
              }/${expireDate?.getDate()} ${expireDate?.getHours()}:${expireDate?.getMinutes()}:${expireDate?.getSeconds()} 까지 제출`}</ExpireDate>
            ) : null}
          </View>
        </Container>
      );
    }
    case AssignmentStatus.NOT_YET: {
      return (
        <Container onPress={goToHomeworkDetail}>
          <LeftLine />

          <View>
            <TitleWrapper>
              <Title>{title}</Title>
            </TitleWrapper>
            {expireDate ? (
              <ExpireDate>{`${expireDate?.getFullYear()}/${
                expireDate?.getMonth() + 1
              }/${expireDate?.getDate()} ${expireDate?.getHours()}:${expireDate?.getMinutes()}:${expireDate?.getSeconds()} 까지 제출`}</ExpireDate>
            ) : null}
          </View>
          <Submit>
            <SubmitText>제출하기</SubmitText>
          </Submit>
        </Container>
      );
    }
    case AssignmentStatus.COMPLETED: {
      return (
        <Container onPress={goToHomeworkDetail} color={colors.blueGray[0]}>
          <LeftLine />
          <View>
            <TitleWrapper>
              <Title color={colors.blueGray[0]}>{title}</Title>
            </TitleWrapper>
            {expireDate ? (
              <ExpireDate
                color={colors.blueGray[0]}>{`${expireDate?.getFullYear()}/${
                expireDate?.getMonth() + 1
              }/${expireDate?.getDate()} ${expireDate?.getHours()}:${expireDate?.getMinutes()}:${expireDate?.getSeconds()} 까지 제출`}</ExpireDate>
            ) : null}
          </View>
          <CompletedSubmit>
            <CompletedText>제출완료</CompletedText>
            {/* <SvgSmile /> */}
          </CompletedSubmit>
        </Container>
      );
    }
    case AssignmentStatus.LAST:
    default: {
      return (
        <Container onPress={goToHomeworkDetail} color={colors.blueGray[0]}>
          <LeftLine />

          <View>
            <TitleWrapper>
              <Title color={colors.blueGray[0]}>{title}</Title>
            </TitleWrapper>
            {expireDate ? (
              <ExpireDate
                color={colors.blueGray[0]}>{`${expireDate?.getFullYear()}/${
                expireDate?.getMonth() + 1
              }/${expireDate?.getDate()} ${expireDate?.getHours()}:${expireDate?.getMinutes()}:${expireDate?.getSeconds()} 까지 제출`}</ExpireDate>
            ) : null}
          </View>
        </Container>
      );
    }
  }
}

interface Color {
  color?: string;
}

const Container = styled.TouchableOpacity<Color>`
  height: 90px;
  padding: 15px;
  margin: 5px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({theme}) => theme.background};
  box-shadow: 0px 0px 2px #c1c8dd;
`;

const LeftLine = styled.View`
  position: absolute;
  left: 0;
  height: 90px;
  width: 3px;
  background-color: ${({theme}) => theme.primary};
`;

const TitleWrapper = styled.View`
  height: 40px;
`;

const Title = styled.Text<Color>`
  font-weight: bold;
  color: ${({color, theme}) => color || theme.font};
  font-size: 16px;
`;

const ExpireDate = styled.Text<Color>`
  color: ${({color, theme}) => color || theme.font};
  font-size: 14px;
`;

const Submit = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${colors.primary};
  justify-content: center;
  align-items: center;
`;

const SubmitText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${({theme}) => theme.background};
`;

const CompletedSubmit = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border-width: 1px;
  border-color: ${colors.blueGray[0]};
  justify-content: center;
  align-items: center;
`;

const CompletedText = styled.Text`
  font-weight: bold;
  font-size: 12px;
  color: ${colors.blueGray[0]};
`;

export default AssignmentItem;
