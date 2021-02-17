import {User} from '../types';

const SET_USER = 'user/SET_USER' as const;
const RESET_USER = 'user/RESET_USER' as const;

export const setFirebaseUserAction = (user: User) => ({
  type: SET_USER,
  payload: user,
});

export const resetFirebaseUserAction = () => ({
  type: RESET_USER,
});

type FirebaseUserAction =
  | ReturnType<typeof setFirebaseUserAction>
  | ReturnType<typeof resetFirebaseUserAction>;

const intialState: User | null = null;

export function firebaseUserReducer(
  state: User | null = intialState,
  action: FirebaseUserAction,
) {
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
