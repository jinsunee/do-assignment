import {
  resetAssignmentsAction,
  setAssignmentsAction,
} from '../providers/assignmentProvider';
import {useDispatch, useSelector} from 'react-redux';

import {Assignment} from '../types';
import {RootState} from '../providers';
import {useCallback} from 'react';

export default function useAssignment() {
  const assignment = useSelector((state: RootState) => state.assignmentReducer);
  const dispatch = useDispatch();

  const setAssignments = useCallback(
    (input: Assignment[]) => dispatch(setAssignmentsAction(input)),
    [dispatch],
  );

  const resetAssignments = useCallback(
    () => dispatch(resetAssignmentsAction()),
    [dispatch],
  );

  return {
    assignment,
    setAssignments,
    resetAssignments,
  };
}
