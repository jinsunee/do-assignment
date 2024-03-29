import {Dimensions} from 'react-native';

export const screenWidth = Math.round(Dimensions.get('window').width);
export const screenHeight = Math.round(Dimensions.get('window').height);

export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validatePassword = (password: string): boolean => {
  const re = /^.*(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  return re.test(password);
};

// 영문자, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.
export const validateUserName = (userName: string): boolean => {
  const reg = /^([a-z0-9._])+$/;
  return reg.test(userName);
};

// 숫자일 때만 true, not ? false,
export const validateNumber = (input: any): boolean => {
  const reg = /^([0-9])$/;
  return reg.test(input);
};

export const dataForSearching = (userName: string): string[] => {
  const userNameForSearching: string[] = [];

  for (let i = 1; i <= userName.length; i++) {
    userNameForSearching.push(userName.substring(0, i));
  }

  return userNameForSearching;
};

export function millisToHoursAndMinutesAndSeconds(millis: number): string {
  let seconds = Math.floor((millis / 1000) % 60),
    minutes = Math.floor((millis / (1000 * 60)) % 60),
    hours = Math.floor((millis / (1000 * 60 * 60)) % 24);

  return (
    getDateString(hours) +
    ':' +
    getDateString(minutes) +
    ':' +
    getDateString(seconds)
  );
}

export const getDateString = (input: number) => {
  if (input <= 0) {
    return '00';
  }

  if (Math.floor(input / 10) === 0) {
    return '0' + input;
  }

  return input;
};
