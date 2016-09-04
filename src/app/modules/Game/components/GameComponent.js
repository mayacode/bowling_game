import React from 'react';

export default class GameComponent extends React.Component {
  static propTypes = {
    clickAction: React.PropTypes.func
  };

  render() {
    const { clickAction } = this.props;

    return (
      <button onClick={clickAction}>Play</button>
    );
  }
};
