import { MAKE_ROLL } from './constants';

const takeARoll = (min, max) => (Math.random() * max | 0) + min;

const initialState = {
  nr: undefined,
  result: undefined
};

export default function store(state = initialState, action) {
  switch (action.type) {
    case MAKE_ROLL:
      const { payload: { min, max, rollNr } } = action;
      let newState = { ...state };

      newState.result = takeARoll(min, max);
      newState.nr = rollNr;

      return { ...newState };
      break;
    default:
      return state;
  }
}
