import {AssignmentQuestion} from '../../types';
import Question from './Question';
import React from 'react';
import Spinner from 'react-native-spinkit';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';

interface Props {
  loading: boolean;
  items?: AssignmentQuestion[] | undefined | null;
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
        <EmptyText>과제가 비어있어요 :(</EmptyText>
      </Container>
    );
  }

  return (
    <ListContainer
      data={items}
      keyExtractor={(item, index): string => index.toString()}
      renderItem={({item}) => <Question key={item.question} item={item} />}
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
  padding: 15px 10px;
`;

export default QuestionList;
