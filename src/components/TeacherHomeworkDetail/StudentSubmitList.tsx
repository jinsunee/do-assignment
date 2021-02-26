import React from 'react';
import Spinner from 'react-native-spinkit';
import StudentSubmitItem from './StudentSubmitItem';
import {StudentSubmitStatus} from '../../types';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';

interface Props {
  classRoomUID: string;
  loading: boolean;
  items: StudentSubmitStatus[] | null | undefined;
  assignmentUID: string;
}

function StudentSubmitList(props: Props): React.ReactElement {
  const {loading, items, assignmentUID, classRoomUID} = props;

  if (loading) {
    return (
      <Container>
        <Spinner type={'ThreeBounce'} />
      </Container>
    );
  }

  if (items === undefined || items === null || !items || items.length <= 0) {
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
        <StudentSubmitItem
          // @ts-ignore
          key={item.studentUID}
          // @ts-ignore
          item={item}
          assignmentUID={assignmentUID}
          classRoomUID={classRoomUID}
        />
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

export default StudentSubmitList;
