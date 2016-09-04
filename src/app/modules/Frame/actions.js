import {
  NEXT_FRAME, ADD_ROLL_TO_FRAME, ADD_FRAME_TO_LIST, UPDATE_FRAME_LIST, COUNT_TOTAL_SCORE
} from './constants';

export const nextFrameAction = (max) => ({
  type: NEXT_FRAME,
  payload: max
});

export const addFrameToList = () => ({
  type: ADD_FRAME_TO_LIST
});

export const addRollToFrame = rollObj => ({
  type: ADD_ROLL_TO_FRAME,
  payload: rollObj
});

export const updateFrameList = frameObj => ({
  type: UPDATE_FRAME_LIST,
  payload: frameObj
});

export const countScore = frameList => ({
  type: COUNT_TOTAL_SCORE,
  payload: frameList
});
