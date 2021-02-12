import React, {ReactChild} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface Props {
  children: ReactChild;
}

function KeyboardWrapper({children}: Props) {
  const keyboardDismiss = (): void => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAwareScrollView
      scrollEnabled={true}
      enableAutomaticScroll={true}
      enableOnAndroid={true}>
      <TouchableWithoutFeedback onPress={keyboardDismiss}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

export default KeyboardWrapper;
