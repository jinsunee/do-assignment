import {
  resetAssignmentsAction,
  setAssignmentsAction,
} from '../providers/assignmentProvider';
import {useDispatch, useSelector} from 'react-redux';

import {Assignment} from '../types';
import {RootState} from '../providers';
import {useCallback} from 'react';

export default function useAssignments() {
  const assignments = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );
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
    assignments,
    setAssignments,
    resetAssignments,
  };
}
