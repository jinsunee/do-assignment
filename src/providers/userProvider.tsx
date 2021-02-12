import {User, UserType} from '../types';

const SET_USER = 'user/SET_USER' as const;
const RESET_USER = 'user/RESET_USER' as const;

export const setUserAction = (user: User) => ({
  type: SET_USER,
  payload: user,
});

export const resetUserAction = () => ({
  type: RESET_USER,
});

type UserAction =
  | ReturnType<typeof setUserAction>
  | ReturnType<typeof resetUserAction>;

const intialState: User = {
  userType: UserType.STUDENT,
  userUID: '',
  userName: '',
  classRoomsUID: [''],
};

export function userReducer(state: User = intialState, action: UserAction) {
  switch (action.type) {
    case SET_USER: {
      return action.payload;
    }
    case RESET_USER: {
      return intialState;
    }
    default:
      return state;
  }
}
