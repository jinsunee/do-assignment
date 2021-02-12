import {resetUserAction, setUserAction} from '../providers/userProvider';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../providers';
import {User} from '../types';
import {useCallback} from 'react';

export default function useUserProvider() {
  const user = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();

  const setUser = useCallback((input: User) => dispatch(setUserAction(input)), [
    dispatch,
  ]);

  const resetUser = useCallback(() => dispatch(resetUserAction()), [dispatch]);

  return {
    user,
    setUser,
    resetUser,
  };
}
