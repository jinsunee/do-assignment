import {Assignment} from '../types';

const SET_ASSIGNMENTS = 'assignment/SET_ASSIGNMENTS' as const;
const RESET_ASSIGNMENTS = 'assignment/RESET_ASSIGNMENTS' as const;

export const setAssignmentsAction = (assignments: Assignment[]) => ({
  type: SET_ASSIGNMENTS,
  payload: assignments,
});

export const resetAssignmentsAction = () => ({
  type: RESET_ASSIGNMENTS,
});

type AssignmentsAction =
  | ReturnType<typeof setAssignmentsAction>
  | ReturnType<typeof resetAssignmentsAction>;

const intialState: Assignment[] | null = null;

export function assignmentsReducer(
  state: Assignment[] | null = intialState,
  action: AssignmentsAction,
) {
  switch (action.type) {
    case SET_ASSIGNMENTS: {
      return action.payload;
    }
    case RESET_ASSIGNMENTS: {
      return intialState;
    }
    default:
      return state;
  }
}
