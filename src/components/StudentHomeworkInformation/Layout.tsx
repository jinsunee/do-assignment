import {BoldText, Header, RowView} from '../../shared';

import {ActivityIndicator} from 'react-native';
import React from 'react';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';

interface Props {
  onPressGetStarted: () => void;
  loading: boolean;
}

function Layout(props: Props): React.ReactElement {
  const {onPressGetStarted, loading} = props;

  const renderButton = (): React.ReactElement => {
    if (loading) {
      return (
        <Button onPress={onPressGetStarted}>
          <ActivityIndicator size={16} color={colors.light} />
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
      <Wrapper>
        <Title>수력충전</Title>
        <MenuItem>
          <MenuItemText>
            <BoldText>제한시간</BoldText>
          </MenuItemText>
          <MenuItemText>30분</MenuItemText>
        </MenuItem>
        <MenuItem>
          <MenuItemText>
            <BoldText>문제 수</BoldText>
          </MenuItemText>
          <MenuItemText>20문제</MenuItemText>
        </MenuItem>
        {renderButton()}
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
