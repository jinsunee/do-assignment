export interface User {
  userType: UserType;
  userUID: string;
  userName: string;
  classRoomsUID: string[];
}

export enum UserType {
  STUDENT = 1,
  TEACHER = 2,
}
