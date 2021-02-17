import Modal from 'react-native-modal';
import React from 'react';
import {ViewStyle} from 'react-native';
import {colors} from '../../utils/theme';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  shownModal: boolean;
  closeModal: () => void;
  onPressEdit: () => void;
  onPressRemove: () => void;
}

function BottomModal(props: Props): React.ReactElement {
  const {shownModal, closeModal, onPressEdit, onPressRemove} = props;
  const insets = useSafeAreaInsets();

  const modalStyle: ViewStyle = {
    margin: 0,
    flexDirection: 'row',
  };

  return (
    <Modal
      isVisible={shownModal}
      style={modalStyle}
      onBackdropPress={closeModal}>
      <Container>
        <Wrapper bottomPadding={insets.bottom}>
          <MenuItem onPress={onPressEdit}>
            <MenuItemText>편집</MenuItemText>
          </MenuItem>
          <MenuItem onPress={onPressRemove}>
            <MenuItemText>삭제</MenuItemText>
          </MenuItem>
          <CloseButton onPress={closeModal}>
            <CloseButtonText>닫기</CloseButtonText>
          </CloseButton>
        </Wrapper>
      </Container>
    </Modal>
  );
}

const Container = styled.View`
  flex: 1;
  align-self: flex-end;
`;

type WrapperStyleProps = {
  bottomPadding: number;
};

const Wrapper = styled.View<WrapperStyleProps>`
  background-color: ${({theme}): string => theme.background};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  align-items: center;
  padding: 50px 15px ${({bottomPadding}) => `${bottomPadding + 20}px`} 15px;
`;

const MenuItem = styled.TouchableOpacity`
  padding: 10px;
  width: 100%;
`;

const MenuItemText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${({theme}) => theme.font};
`;

const CloseButton = styled.TouchableOpacity`
  padding: 15px 20px;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${colors.blueGray[0]};
`;

const CloseButtonText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${({theme}) => theme.font};
`;

export default BottomModal;
