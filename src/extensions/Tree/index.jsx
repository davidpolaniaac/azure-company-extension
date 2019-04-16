import React from 'react';
import ReactDOM from 'react-dom';
import * as SDK from 'azure-devops-extension-sdk';
import { Page } from 'azure-devops-ui/Page';
import { Header, TitleSize } from 'azure-devops-ui/Header';

class Tree extends React.Component {
  componentDidMount() {
    SDK.init();
  }

  render() {
    return (
      <Page className="sample-hub flex-grow">

        <Header
          title="Tree"
          titleSize={TitleSize.Large}
        />

        <div className="page-content">
          <div>Coming soon</div>
        </div>

      </Page>

    );
  }
}

ReactDOM.render(
  <Tree />
  , document.getElementById('root'),
);
