import React from 'react';
import { connect } from 'react-redux';
import FrameComponent from '../../Frame/components/FrameComponent';
import RollResultComponent from '../../Roll/components/RollResultComponent';
import { makeRollAction } from '../../Roll/actions';
import {
  addRollToFrame, nextFrameAction, addFrameToList, updateFrameList, countScore,
  updateResultsWithBonus
} from '../actions';

class FrameContainer extends React.Component {
  static propTypes = {
    frame: React.PropTypes.object,
    roll: React.PropTypes.object,
    conf: React.PropTypes.object,
    makeRollAction: React.PropTypes.func,
    addRollToFrame: React.PropTypes.func
  };

  componentWillReceiveProps(nextProps) {
    const props = this.props;
    if (!Object.is(props.roll, nextProps.roll)) {
      props.addRollToFrame({ roll: nextProps.roll, conf: nextProps.conf });
      props.updateResultsWithBonus(nextProps.roll);
    }

    if (!Object.is(props.frame, nextProps.frame)) {
      props.updateFrameList(nextProps.frame);
    }

    if (props.frameList.length < nextProps.frameList.length) {
      props.nextFrameAction();
    }

    if (props.frame.isCompleted && props.frame.isLastFrame) {
      props.countScore(nextProps.frameList);
    }
  }

  renderFrames() {
    const { makeRollAction, addFrameToList, frameList, conf } = this.props;

    return frameList.map((frameObj, index) => (
      <FrameComponent
        key={index}
        number={frameObj.frameNr}
        isCompleted={frameObj.isCompleted}
        total={frameObj.total}
        rollAction={makeRollAction}
        nextAction={addFrameToList}
        readOnly={frameList[index + 1]}
        isLastFrame={frameObj.isLastFrame}
      >
        {frameObj.results.map((roll, index) => {
          if (index < frameObj.toShow) {
            return (
              <RollResultComponent
                key={index}
                nr={index + 1}
                result={roll}
                specialCase={conf.specialCases.map((name, index) => {
                  if (frameObj.specialCase[name] === (index + 1)) {
                    return { name };
                  }
                })[0]}
              />
            );
          }
        })}
      </FrameComponent>
    ));
  }

  render() {//console.log('FrameContainer', { ...this.props });
    return (
      <div>
        {this.renderFrames()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  frame: state.frame,
  frameList: state.frameList,
  roll: state.roll,
  conf: ownProps.conf
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { conf, frame } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...stateProps,
    ...ownProps,
    ...dispatchProps,
    makeRollAction: () => dispatch(
      makeRollAction({
        min: conf.minRollResult,
        max: (frame.rest || conf.numberOfPins) + 1,
        rollNr: frame.results.length + 1
      })
    ),
    addRollToFrame: rollObj => dispatch(addRollToFrame(rollObj)),
    updateFrameList: frameObj => dispatch(updateFrameList(frameObj)),
    nextFrameAction: () => dispatch(nextFrameAction(conf.numberOfFrames)),
    addFrameToList: () => dispatch(addFrameToList()),
    countScore: frameList => dispatch(countScore(frameList)),
    updateResultsWithBonus: roll => dispatch(updateResultsWithBonus(roll))
  };
};

export default connect(mapStateToProps, null, mergeProps)
(FrameContainer);
