import {Assignment} from '../types';

const SET_ASSIGNMENTS = 'assignment/SET_ASSIGNMENTS' as const;
const RESET_ASSIGNMENTS = 'assignment/RESET_ASSIGNMENTS' as const;

export const setAssignmentsAction = (assignment: Assignment) => ({
  type: SET_ASSIGNMENTS,
  payload: assignment,
});

export const resetAssignmentsAction = () => ({
  type: RESET_ASSIGNMENTS,
});

type AssignmentAction =
  | ReturnType<typeof setAssignmentsAction>
  | ReturnType<typeof resetAssignmentsAction>;

const intialState: Assignment | null = null;

export function assignmentReducer(
  state: Assignment | null = intialState,
  action: AssignmentAction,
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
