import React from 'react';
import PageComponent from '../components/PageComponent';

export default class PageContainer extends React.Component {
  static propTypes = {
    playAction: React.PropTypes.func
  };

  render() {
    return (
      <PageComponent>
        <div>Hello World</div>
      </PageComponent>
    );
  }
}
