import {BoldText, Header, RowView} from '../../shared';

import {Assignment} from '../../types';
import {LoadingScreen} from '../../shared';
import React from 'react';
import Spinner from 'react-native-spinkit';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';

interface Props {
  onPressGetStarted: () => void;
  loading: boolean;
  item: Assignment;
  questionsSize: number;
  loadingStart: boolean;
}

function Layout(props: Props): React.ReactElement {
  const {
    onPressGetStarted,
    loading,
    item: {title, limitTime},
    questionsSize,
    loadingStart,
  } = props;

  const renderLoading = (): React.ReactElement | null => {
    if (loading) {
      return <LoadingScreen />;
    }

    return null;
  };

  const renderStartButton = (): React.ReactElement => {
    if (loadingStart) {
      return (
        <Button onPress={onPressGetStarted}>
          <Spinner
            type={'ThreeBounce'}
            color={colors.light}
            style={
              {
                // alignSelf: 'center',
              }
            }
          />
        </Button>
      );
    }

    return (
      <Button onPress={onPressGetStarted}>
        <ButtonText>시작하기</ButtonText>
      </Button>
    );
  };

  return (
    <Container>
      <Header />
      {renderLoading()}
      <Wrapper>
        <Title>{title}</Title>
        <MenuItem>
          <MenuItemText>
            <BoldText>제한시간</BoldText>
          </MenuItemText>
          <MenuItemText>{limitTime}분</MenuItemText>
        </MenuItem>
        <MenuItem>
          <MenuItemText>
            <BoldText>문제 수</BoldText>
          </MenuItemText>
          <MenuItemText>{questionsSize}문제</MenuItemText>
        </MenuItem>
        {renderStartButton()}
      </Wrapper>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.backgroundGray};
`;

const Wrapper = styled.View`
  padding: 30px 15px;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 30px;
  color: ${({theme}) => theme.font};
  margin-bottom: 30px;
`;

const MenuItem = styled(RowView)`
  padding: 10px 0;
`;

const MenuItemText = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.font};
`;

const Button = styled.TouchableOpacity`
  height: 60px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.primary};
  border-radius: 10px;
  margin-top: 30px;
`;

const ButtonText = styled.Text`
  color: ${colors.light};
  font-weight: bold;
  font-size: 20px;
`;

export default Layout;
