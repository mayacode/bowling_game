import { combineReducers } from 'redux';
import game from '../modules/Game/reducer';
import { frame, frames, totalScore } from '../modules/Frame/reducer';
import roll from '../modules/Roll/reducer';

const rootReducer = combineReducers({
  game, frame, frameList: frames, roll, totalScore
});

export default rootReducer;
