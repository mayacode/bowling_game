import { combineReducers } from 'redux';
import game from '../modules/Game/reducer';

const rootReducer = combineReducers({ game });

export default rootReducer;
