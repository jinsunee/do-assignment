import {ClassRoom} from '../types';

const SET_CLASSROOM = 'classroom/SET_CLASSROOM' as const;
const RESET_CLASSROOM = 'classroom/RESET_CLASSROOM' as const;

export const setClassRoomAction = (classRoom: ClassRoom) => ({
  type: SET_CLASSROOM,
  payload: classRoom,
});

export const resetClassRoomAction = () => ({
  type: RESET_CLASSROOM,
});

type ClassRoomAction =
  | ReturnType<typeof setClassRoomAction>
  | ReturnType<typeof resetClassRoomAction>;

const intialState: ClassRoom | null = null;

export function classRoomReducer(
  state: ClassRoom | null = intialState,
  action: ClassRoomAction,
) {
  switch (action.type) {
    case SET_CLASSROOM: {
      return action.payload;
    }
    case RESET_CLASSROOM: {
      return intialState;
    }
    default:
      return state;
  }
}
