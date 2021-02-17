import {StudentSubmitStatusType, SubmitAnswersType} from '../../types';

import {Header} from '../../shared';
import React from 'react';
import Spinner from 'react-native-spinkit';
import SubmitAnswerItem from './SubmitAnswerItem';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';

interface Props {
  loading?: boolean;
  studentName: string;
  submitStatus: StudentSubmitStatusType;
  submitTime?: Date | undefined;
  submitAnswers?: SubmitAnswersType[] | undefined;
  changeMarkStatus: (index: number) => void;
}

function Layout(props: Props): React.ReactElement {
  const {
    loading,
    studentName,
    submitStatus,
    submitTime,
    submitAnswers,
    changeMarkStatus,
  } = props;

  const flatListHeader = (): React.ReactElement => {
    return (
      <FlatListHeader>
        <TopWrapper>
          <StudentName>
            <BoldText>{studentName}</BoldText> 학생
          </StudentName>
          <Submit>
            <SubmitStatusText fontColor={colors.primary}>
              제출 완료
            </SubmitStatusText>
            {submitTime ? (
              <SubmitTime>{`${submitTime.getFullYear()}/${
                submitTime.getMonth() + 1
              }/${submitTime.getDate()} ${submitTime.getHours()}:${submitTime.getMinutes()}:${submitTime.getSeconds()}`}</SubmitTime>
            ) : null}
          </Submit>
        </TopWrapper>
      </FlatListHeader>
    );
  };

  if (loading) {
    return (
      <Container>
        <Header />
        <Spinner
          type={'ThreeBounce'}
          style={{
            marginTop: 200,
            alignSelf: 'center',
          }}
        />
      </Container>
    );
  }

  // 제출 완료
  if (submitAnswers && submitStatus === StudentSubmitStatusType.COMPLETED) {
    return (
      <Container>
        <Header />
        <ListContainer
          data={submitAnswers}
          keyExtractor={(item, index): string => index.toString()}
          renderItem={({item, index}) => (
            <SubmitAnswerItem
              // @ts-ignore
              key={item.studentUID}
              // @ts-ignore
              item={item}
              changeMarkStatus={() => changeMarkStatus(index)}
            />
          )}
          ListHeaderComponent={flatListHeader}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <TopWrapper>
        <StudentName>
          <BoldText>{studentName}</BoldText> 학생
        </StudentName>
        <SubmitStatusText fontColor={colors.negative}>미제출</SubmitStatusText>
      </TopWrapper>
      <NotYetText>채점결과가 없어요. :(</NotYetText>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const TopWrapper = styled.View`
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NotYetText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${colors.blueGray[0]};
  align-self: center;
  margin-top: 50px;
`;

const BoldText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.font};
`;

const StudentName = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.font};
`;

type SubmitStatusStyleProps = {
  fontColor: string;
};

const SubmitStatusText = styled.Text<SubmitStatusStyleProps>`
  color: ${({fontColor}) => fontColor};
  font-weight: bold;
  font-size: 12px;
`;

const ListContainer = styled.FlatList``;

const FlatListHeader = styled.View``;

const Submit = styled.View`
  align-items: flex-end;
`;

const SubmitTime = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.font};
`;

export default Layout;
