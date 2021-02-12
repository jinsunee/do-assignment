import React, {useState} from 'react';
import {validateEmail, validatePassword} from '../../utils/common';

import InsertEmailLayout from './InsertEmailLayout';
import SignInLayout from './SignInLayout';
import SignUpLayout from './SignUpLayout';
import {useNavigation} from '@react-navigation/native';

enum ScreenType {
  INSERT_EMAIL,
  SIGN_IN,
  SIGN_UP,
}

function Page(): React.ReactElement {
  const [screenType, setScreenType] = useState<ScreenType>(
    ScreenType.INSERT_EMAIL,
  );
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>();
  const [warningConfirm, setWarningConfirm] = useState<string>();

  const navigation = useNavigation();

  const onChageEmail = (text: string) => {
    setEmail(text);
  };

  const onChagePassword = (text: string) => {
    setPassword(text);
  };

  const onChageConfirmPassword = (text: string) => {
    setConfirmPassword(text);
  };

  switch (screenType) {
    case ScreenType.INSERT_EMAIL:
    default: {
      const requestConfirmJoined = async () => {
        try {
          setLoading(true);
          if (!validateEmail(email)) {
            setWarning('이메일 형식으로 올바르게 입력해주세요.');
            setLoading(false);
            return;
          }

          setScreenType(ScreenType.SIGN_UP);
          setLoading(false);
          setWarning('');
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <InsertEmailLayout
          email={email}
          onChageEmail={onChageEmail}
          loadingSubmit={loading}
          onSubmit={requestConfirmJoined}
          warning={warning}
        />
      );
    }
    case ScreenType.SIGN_IN: {
      const requestSignIn = async () => {
        try {
          setLoading(true);
          if (!validateEmail(password)) {
            setWarning('다른 비밀번호를 입력해주세요.');
            setLoading(false);
            return;
          }

          // const result = await signIn(email, password);
          // if (!result) {
          setWarning('다른 비밀번호를 입력해주세요.');
          // setLoading(false);
          // }
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <SignInLayout
          password={password}
          onChangePassword={onChagePassword}
          loadingSubmit={loading}
          onSubmit={requestSignIn}
          warning={warning}
        />
      );
    }
    case ScreenType.SIGN_UP: {
      const goToVerifyEmail = () => {
        navigation.navigate('VerifyEmail');
      };

      const requestSignUp = async () => {
        try {
          setLoading(true);

          if (!validatePassword(password)) {
            setWarning('6자 이상의 비밀번호를 입력해주세요.');
            setLoading(false);
            return;
          }

          if (password !== confirmPassword) {
            setWarningConfirm('같은 비밀번호를 입력해주세요.');
            setLoading(false);
            return;
          }

          setWarning('');
          setWarningConfirm('');
          setLoading(false);
          // await signUpEmail(email, password);
          goToVerifyEmail();
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <SignUpLayout
          password={password}
          onChangePassword={onChagePassword}
          confirmPassword={confirmPassword}
          onChangeConfirmPassword={onChageConfirmPassword}
          loadingSubmit={loading}
          onSubmit={requestSignUp}
          warning={warning}
          warningConfirm={warningConfirm}
        />
      );
    }
  }
}

export default Page;
