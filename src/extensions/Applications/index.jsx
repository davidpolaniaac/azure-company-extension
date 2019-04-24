import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import * as SDK from 'azure-devops-extension-sdk';
import store from './redux/store';
import App from './app/App';
import './index.scss';
import * as serviceWorker from './serviceWorker';

class Root extends React.Component {
  async componentDidMount() {
    await SDK.init();
    await SDK.ready();
  }

  render() {
    return <App />;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>
  , document.getElementById('root'),
);

serviceWorker.unregister();
