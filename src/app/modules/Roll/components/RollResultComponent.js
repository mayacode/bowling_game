import React from 'react';
import ButtonComponent from '../../Elements/components/Button';

export default class RollResultComponent extends React.Component {
  static propTypes = {
    result: React.PropTypes.number,
    nr: React.PropTypes.number,
    isStrike: React.PropTypes.bool,
    isSpare: React.PropTypes.bool
  };

  render() {// console.log('RollResultComponent', this.props);
    const { nr, result, specialCase } = this.props;

    return (
      <div>
        Roll #{nr}: {result}
        {specialCase && <span style={{ color: 'red' }}>{specialCase}!</span>}
      </div>
    );
  }
};
