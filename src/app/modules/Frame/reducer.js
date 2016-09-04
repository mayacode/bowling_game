import {
  ADD_ROLL_TO_FRAME, NEXT_FRAME, UPDATE_FRAME_LIST, ADD_FRAME_TO_LIST, COUNT_TOTAL_SCORE,
  UPDATE_RESULTS_WITH_BONUS
} from './constants';

const initialState = {
  frameNr: 1,
  results: [],
  total: 0,
  rest: 0,
  isCompleted: false,
  specialCase: {},
  isLastFrame: false,
  toShow: 0
};

const prepareNextFrame = (frameNr, max) => ({
  ...initialState,
  frameNr: frameNr,
  isLastFrame: frameNr === max
});

const getRollPoints = rolls => rolls.reduce(
  (previousValue, currentValue) => currentValue > -1 ? previousValue + currentValue : previousValue
);

const isSpecial = (rolls, conf, index) => (
  rolls.length === conf.numberOfFramesForSpecialCase[index] &&
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
  conf.specialCases.every((name, index) => {
    if (isSpecial(frame.results, conf, index)) {
      frame.specialCase[name] = true;
      frame.isCompleted = true;
      frame.toShow = conf.numberOfFramesForSpecialCase[index];
      for (var i = 0; i < conf.additionalRollsForSpecialCase[index]; i++) {
        frame.results.push(-1);
      }

      return false;
    }

    return true;
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
        newState.toShow += 1;
        checkFrameEdgeCases(newState, conf);
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
    case UPDATE_RESULTS_WITH_BONUS:
      let newState = [...state];
      newState.map((frame, index) => {
        const i = frame.results.indexOf(-1);
        if (i > 0) {
          let results = [...frame.results];
          results[i] = action.payload.result;
          newState[index].results = results;
          newState[index].total = frame.total + action.payload.result;
        }
      });

      return newState;
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
