import React from 'react';
import { render } from 'react-dom';
import ButtonComponent from '../../Elements/components/Button';

export default class FrameComponent extends React.Component {
  static propTypes = {
    number: React.PropTypes.number,
    isCompleted: React.PropTypes.bool,
    rollAction: React.PropTypes.func,
    nextAction: React.PropTypes.func
  };

  render() {
    const {
      number, isCompleted, total, rollAction, nextAction, readOnly, isLastFrame, children
    } = this.props;

    return (
      <section className={`frame frame${number}`}>
        <header>Frame #{number}</header>
        <div>{children}</div>
        {<div>Total: {total}</div>}
        <footer>
          {!isCompleted && <ButtonComponent
            clickAction={rollAction}
            text="Roll"
          />}
          {isCompleted && !readOnly && !isLastFrame && <div>
            <ButtonComponent
              clickAction={nextAction}
              text="Next Frame"
            />
          </div>}
        </footer>
      </section>
    );
  }
}
