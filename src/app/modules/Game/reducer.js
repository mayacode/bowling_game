import { PLAY } from './constants';

const initialState = {
  activeGame: false
};

export default function store(state = initialState, action) {
  switch (action.type) {
    case PLAY:
      return { ...state, activeGame: true };
      break;
    default:
      return state;
  }
}
