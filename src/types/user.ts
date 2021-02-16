export interface User {
  userType: UserType;
  userUID: string;
  userName: string;
  classRoomsUID: string[];
}

export interface StudentListItemType {
  studentUID: string;
  studentName: string;
}

export enum UserType {
  STUDENT = 1,
  TEACHER = 2,
}

export enum SignInType {
  APPLE = 'Apple',
  EMAIL = '이메일',
}
