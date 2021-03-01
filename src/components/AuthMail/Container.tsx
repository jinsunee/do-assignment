import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {confirmSignIn, signInEmail} from '../../apis/fetch';
import {validateEmail, validatePassword} from '../../utils/common';

import InsertEmailLayout from './InsertEmailLayout';
import SignInLayout from './SignInLayout';
import SignUpLayout from './SignUpLayout';
import {signUpEmail} from '../../apis/insert';
import useUser from '../../hooks/useUser';

enum ScreenType {
  INSERT_EMAIL,
  SIGN_IN,
  SIGN_UP,
}

function Page(): React.ReactElement {
  const {user, setUser} = useUser();

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

          const isJoined = await confirmSignIn(email);

          if (isJoined || user) {
            setScreenType(ScreenType.SIGN_IN);
            setLoading(false);
            setWarning('');
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
          onChageEmail={setEmail}
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
          if (!password) {
            setWarning('비밀번호를 입력해주세요.');
            setLoading(false);
            return;
          }

          const result = await signInEmail(email, password);
          if (!result) {
            setWarning('다른 비밀번호를 입력해주세요.');
            setLoading(false);
            return;
          }

          if (user) {
            setUser({
              ...user,
              email: result.email,
              emailVerified: result.emailVerified,
            });
          }
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <SignInLayout
          password={password}
          onChangePassword={setPassword}
          loadingSubmit={loading}
          onSubmit={requestSignIn}
          warning={warning}
        />
      );
    }
    case ScreenType.SIGN_UP: {
      const goToVerifyEmail = (emailInput: string) => {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: 'VerifyEmail',
                params: {
                  email: emailInput,
                },
              },
            ],
          }),
        );
      };

      const requestSignUp = async () => {
        try {
          setLoading(true);

          if (password.length < 6 && !validatePassword(password)) {
            setWarning(
              '숫자, 문자, 특수문자 조합의 6자 이상의 비밀번호를 입력해주세요.',
            );
            setWarningConfirm('');
            setLoading(false);
            return;
          }

          if (password !== confirmPassword) {
            setWarningConfirm('같은 비밀번호를 입력해주세요.');
            setWarning('');
            setLoading(false);
            return;
          }

          const result = await signUpEmail(email, password);

          if (result) {
            goToVerifyEmail(email);
            return;
          }
          setWarning('');
          setWarningConfirm('');
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <SignUpLayout
          password={password}
          onChangePassword={setPassword}
          confirmPassword={confirmPassword}
          onChangeConfirmPassword={setConfirmPassword}
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
