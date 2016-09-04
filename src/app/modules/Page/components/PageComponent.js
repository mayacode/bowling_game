import React from 'react';
import { render } from 'react-dom';

export default class PageComponent extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <div>
        <header><h1>Bowling challenge</h1></header>
        {React.Children.only(children)}
        <footer>&copy; 2016 by Maja Miarecki</footer>
      </div>
    );
  }
}
