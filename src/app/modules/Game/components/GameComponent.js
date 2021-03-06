import React from 'react';
import ButtonComponent from '../../Elements/components/Button';

export default class GameComponent extends React.Component {
  static propTypes = {
    clickAction: React.PropTypes.func
  };

  render() {
    const { clickAction } = this.props;

    return <ButtonComponent
      clickAction={clickAction}
      text="Play"
    />;
  }
};
