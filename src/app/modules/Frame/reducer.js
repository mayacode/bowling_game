import {
  ADD_ROLL_TO_FRAME, NEXT_FRAME, UPDATE_FRAME_LIST, ADD_FRAME_TO_LIST, COUNT_TOTAL_SCORE
} from './constants';

const initialState = {
  frameNr: 1,
  results: [],
  total: 0,
  rest: 0,
  isCompleted: false,
  specialCase: {},
  isLastFrame: false
};

const prepareNextFrame = (frameNr, max) => ({
  ...initialState,
  frameNr: frameNr,
  isLastFrame: frameNr === max
});

const getRollPoints = rolls => rolls.reduce(
  (previousValue, currentValue) => previousValue + currentValue
);

const isSpecial = (rolls, conf, index) => (
  rolls.length === conf.numberOfFramesForSpecialCase[name] &&
  getRollPoints(rolls) === conf.numberOfPins
);

const allRollsMadeForSpecial = (frame, conf) => {
  const res = conf.specialCases.map((name, index) => {
    if (frame.specialCase[name]) {
      return frame.results.length ===
        conf.numberOfFramesForSpecialCase[index] + conf.additionalRollsForSpecialCase[index];
    }
  });
  return res.indexOf(true) > -1;
};

const isNextRollPossible = (frame, conf) => !isSpecial(frame.results, conf, 'strike') &&
    !(frame.results.length === conf.minNumberOfRollsPerFrame);

const checkFrameEdgeCases = (frame, conf) => {
  conf.specialCases.map((name, index) => {
    if (isSpecial(frame.results, conf, index)) {
      frame.specialCase[name] = conf.numberOfFramesForSpecialCase[index];
    }
  });
  return frame;
};

export function frame(state = { ...initialState }, action) {
  switch (action.type) {
    case NEXT_FRAME:
      return { ...prepareNextFrame(state.frameNr + 1, action.payload) };
      break;
    case ADD_ROLL_TO_FRAME:
      let newState = { ...state };
      const { roll, conf } = action.payload;
      if (isNextRollPossible(newState, conf)) {
        let results = [...newState.results];
        results.push(roll.result);
        newState.results = results;
        newState.isCompleted = !isNextRollPossible(newState, conf);
        newState.total = getRollPoints(newState.results);
        newState.rest = conf.numberOfPins - roll.result;
      } else {
        newState.total = getRollPoints(newState.results);
      }

      return newState;
    default:
      return state;
  }
}

const addFrame = (state, frameObj) => {
  frameObj.frameNr = state.length + 1;
  state.push(frameObj);
  return state;
};

const updateFrame = (state, frameObj) => {
  state[state.length - 1] = frameObj;
  return state;
};

export function frames(state = [{ ...initialState }], action) {
  switch (action.type) {
    case ADD_FRAME_TO_LIST:
      return [...addFrame([...state], { ...initialState })];
      break;
    case UPDATE_FRAME_LIST:
      return [...updateFrame([...state], action.payload)];
      break;
    default:
      return state;
  }
}

export function totalScore(state = { totalScore: 0 }, action) {
  switch (action.type) {
    case COUNT_TOTAL_SCORE:
      let newState = { ...state };
      let score = action.payload.reduce(
        (previousValue, currentValue) => (previousValue.hasOwnProperty('total') ?
           previousValue.total : previousValue) + currentValue.total
      );

      return { ...newState, totalScore: score };
      break;
    default:
      return state;
  }
}
