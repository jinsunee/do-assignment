import Modal from 'react-native-modal';
import React from 'react';

interface Props {
  children: React.ReactChild;
  showModal: boolean;
  closeModal: () => void;
}

function BottomModal(props: Props): React.ReactElement {
  const {showModal, closeModal, children} = props;

  const modalStyle = {
    margin: 0,
    padding: 20,
  };

  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={closeModal}
      style={modalStyle}>
      {children}
    </Modal>
  );
}

export default BottomModal;
