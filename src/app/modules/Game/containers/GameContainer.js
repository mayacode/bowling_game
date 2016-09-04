import React from 'react';
import { connect } from 'react-redux';
import FrameContainer from '../../Frame/containers/FrameContainer';
import GameComponent from '../components/GameComponent';
import { playAction } from '../actions';

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.renderFrames = this.renderFrames.bind(this);
  }

  static propTypes = {
    game: React.PropTypes.object,
    playAction: React.PropTypes.func
  };

  renderFrames() {
    const { conf } = this.props;

    return <FrameContainer conf={conf} />;
  };

  render() {// console.log('GameContainer', this.props);
    const { game: { activeGame }, playAction, totalScore } = this.props;

    return (
      <div>
        {!activeGame && <GameComponent clickAction={playAction} />}
        <div>
          {activeGame && this.renderFrames()}
        </div>
        {totalScore > 0 && <div>Total score: {totalScore}</div>}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  game: state.game,
  totalScore: state.totalScore.totalScore,
  conf: ownProps.conf
});

const mapDispatchToProps = (dispatch) => ({
  playAction: () => dispatch(playAction())
});

export default connect(mapStateToProps, mapDispatchToProps)
  (GameContainer);
