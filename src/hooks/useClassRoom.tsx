import {
  resetClassRoomAction,
  setClassRoomAction,
} from '../providers/classRoomProvider';
import {useDispatch, useSelector} from 'react-redux';

import {ClassRoom} from '../types';
import {RootState} from '../providers';
import {useCallback} from 'react';

export default function useUserProvider() {
  const classRoom = useSelector((state: RootState) => state.classRoomReducer);
  const dispatch = useDispatch();

  const setClassRoom = useCallback(
    (input: ClassRoom) => dispatch(setClassRoomAction(input)),
    [dispatch],
  );

  const resetClassRoom = useCallback(() => dispatch(resetClassRoomAction()), [
    dispatch,
  ]);

  return {
    classRoom,
    setClassRoom,
    resetClassRoom,
  };
}
