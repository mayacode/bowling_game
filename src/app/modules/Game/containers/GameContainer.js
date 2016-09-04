import React from 'react';
import { connect } from 'react-redux';
import GameComponent from '../components/GameComponent';
import { playAction } from '../actions';

class GameContainer extends React.Component {
  static propTypes = {
    game: React.PropTypes.object,
    playAction: React.PropTypes.func
  };

  render() {
    const { game: { activeGame }, playAction } = this.props;

    return (
      <div>
        {!activeGame && <GameComponent clickAction={playAction} />}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  game: state.game,
  conf: ownProps.conf
});

const mapDispatchToProps = (dispatch) => ({
  playAction: () => dispatch(playAction())
});

export default connect(mapStateToProps, mapDispatchToProps)
  (GameContainer);
