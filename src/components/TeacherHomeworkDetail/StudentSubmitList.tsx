import React from 'react';
import Spinner from 'react-native-spinkit';
import StudentSubmitItem from './StudentSubmitItem';
import {StudentSubmitStatus} from '../../types';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';

interface Props {
  loading: boolean;
  items: StudentSubmitStatus[] | undefined | null;
}

function QuestionList(props: Props): React.ReactElement {
  const {loading, items} = props;

  if (loading) {
    return (
      <Container>
        <Spinner type={'ThreeBounce'} />
      </Container>
    );
  }

  if (!items) {
    return (
      <Container>
        <EmptyText>클래스에 가입한 학생이 없어요 :(</EmptyText>
      </Container>
    );
  }

  return (
    <ListContainer
      data={items}
      keyExtractor={(item, index): string => index.toString()}
      renderItem={({item}) => (
        <StudentSubmitItem key={item.studentUID} item={item} />
      )}
    />
  );
}

const Container = styled.View`
  padding: 50px 15px;
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled.Text`
  margin-top: 50px;
  font-weight: bold;
  font-size: 18px;
  color: ${colors.blueGray[0]};
`;

const ListContainer = styled.FlatList`
  margin: 15px 0;
`;

export default QuestionList;