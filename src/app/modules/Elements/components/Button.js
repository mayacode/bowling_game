import React from 'react';
import { render } from 'react-dom';

export default class ButtonComponent extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    text: React.PropTypes.string,
    styles: React.PropTypes.object,
    clickAction: React.PropTypes.func
  };

  render() {
    const { className, text, styles, clickAction } = this.props;
    return (
      <button
        className={className}
        style={styles}
        onClick={clickAction}
      >
        {text}
      </button>
    );
  }
};
