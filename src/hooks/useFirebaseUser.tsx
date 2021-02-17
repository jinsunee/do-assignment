import {
  resetFirebaseUserAction,
  setFirebaseUserAction,
} from '../providers/firebaseUserProvider';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../providers';
import {User} from '../types';
import {useCallback} from 'react';

export default function useUserProvider() {
  const firebaseUser = useSelector(
    (state: RootState) => state.firebaseUserReducer,
  );
  const dispatch = useDispatch();

  const setFirebaseUser = useCallback(
    (input: User) => dispatch(setFirebaseUserAction(input)),
    [dispatch],
  );

  const resetFirebaseUser = useCallback(
    () => dispatch(resetFirebaseUserAction()),
    [dispatch],
  );

  return {
    firebaseUser,
    setFirebaseUser,
    resetFirebaseUser,
  };
}
