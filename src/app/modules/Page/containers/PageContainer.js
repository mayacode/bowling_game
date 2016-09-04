import React from 'react';
import PageComponent from '../components/PageComponent';
import GameContainer from '../../Game/containers/GameContainer';
import gameConf from '../../../config/appConfig';

export default class PageContainer extends React.Component {
  static propTypes = {
    playAction: React.PropTypes.func
  };

  render() {
    return (
      <PageComponent>
        <GameContainer conf={gameConf} />
      </PageComponent>
    );
  }
}
