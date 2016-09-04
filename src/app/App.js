import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import PageContainer from './modules/Page/containers/PageContainer';
import store from './config/configureStore';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PageContainer />
      </Provider>
    );
  }
}
