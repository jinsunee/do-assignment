import {
  AssignmentQuestion,
  HeaderElementType,
  StudentSubmitStatus,
} from '../../types';
import {BoldText, Header} from '../../shared';

import {KeyboardWrapper} from '../../shared';
import MoreModal from './MoreModal';
import QuestionList from './QuestionsList';
import React from 'react';
import {RenderListType} from './Container';
import StudentSubmitList from './StudentSubmitList';
import {SvgMore} from '../../utils/Icons';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';

interface Props {
  title: string;
  date?: Date;
  description?: string;
  renderListType: RenderListType;
  onPressMenuItem: (renderListType: RenderListType) => void;
  loadingSubmitStatusItems: boolean;
  submitStatusItems: StudentSubmitStatus[] | undefined | null;
  loadingQuestionList: boolean;
  questionList: AssignmentQuestion[] | undefined | null;
  shownModal: boolean;
  handleModal: () => void;
  onPressEdit: () => void;
  onPressRemove: () => void;
}

function Layout(props: Props): React.ReactElement {
  const {
    title,
    date,
    description,
    renderListType,
    onPressMenuItem,
    loadingSubmitStatusItems,
    submitStatusItems,
    loadingQuestionList,
    questionList,
    shownModal,
    handleModal,
    onPressEdit,
    onPressRemove,
  } = props;

  const rightElements: HeaderElementType[] = [
    {
      key: 'more button',
      element: <SvgMore />,
      onPressElement: handleModal,
    },
  ];

  const renderDate = (): React.ReactElement | null => {
    if (date) {
      return (
        <Date>
          <BoldText>{`${date?.getFullYear()}/${
            date?.getMonth() + 1
          }/${date?.getDate()} ${date?.getHours()}:${date?.getMinutes()}:${date?.getSeconds()}`}</BoldText>
          까지 제출
        </Date>
      );
    }

    return null;
  };

  const renderDescription = (): React.ReactElement | null => {
    if (description) {
      return <Description>{description}</Description>;
    }

    return null;
  };

  const renderList = (): React.ReactElement => {
    if (renderListType === RenderListType.QUESTIONS) {
      return (
        <QuestionList loading={loadingQuestionList} items={questionList} />
      );
    } else {
      return (
        <StudentSubmitList
          loading={loadingSubmitStatusItems}
          items={submitStatusItems}
        />
      );
    }
  };

  return (
    <Container>
      <Header rightElements={rightElements} />
      <KeyboardWrapper>
        <Wrapper>
          <TitleWrapper>
            <Title>{title}</Title>
          </TitleWrapper>
          {renderDescription()}
          {renderDate()}
          <MenuWrapper>
            <MenuItem
              focus={renderListType === RenderListType.SUBMIT_STATUS}
              onPress={() => onPressMenuItem(RenderListType.SUBMIT_STATUS)}>
              <MenuItemText
                focus={renderListType === RenderListType.SUBMIT_STATUS}>
                제출 현황
              </MenuItemText>
            </MenuItem>
            <MenuItem focus={renderListType === RenderListType.QUESTIONS}>
              <MenuItemText
                focus={renderListType === RenderListType.QUESTIONS}
                onPress={() => onPressMenuItem(RenderListType.QUESTIONS)}>
                문제
              </MenuItemText>
            </MenuItem>
          </MenuWrapper>
          {renderList()}
        </Wrapper>
      </KeyboardWrapper>
      <MoreModal
        shownModal={shownModal}
        closeModal={handleModal}
        onPressEdit={onPressEdit}
        onPressRemove={onPressRemove}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const Wrapper = styled.View`
  padding: 5px 15px;
`;

const TitleWrapper = styled.View`
  padding: 10px 0 20px 0;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${({theme}) => theme.font};
`;

const Date = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.font};
  justify-content: center;
`;

const Description = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.font};
  justify-content: center;
  margin-bottom: 10px;
`;

const MenuWrapper = styled.View`
  flex-direction: row;
  margin-top: 15px;
`;

interface MenuItemStyleProps {
  focus: boolean;
}

const MenuItem = styled.TouchableOpacity<MenuItemStyleProps>`
  padding: 15px;
  background-color: ${({focus, theme}) => {
    if (focus) {
      return colors.primary;
    }
    return theme.background;
  }};
  margin-right: 10px;
  border-radius: 20px;
`;

const MenuItemText = styled.Text<MenuItemStyleProps>`
  font-weight: 500;
  font-size: 16px;
  color: ${({focus, theme}) => (focus ? theme.background : theme.font)};
`;

export default Layout;
