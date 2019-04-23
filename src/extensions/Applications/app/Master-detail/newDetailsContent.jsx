import React from 'react';
import { Page } from 'azure-devops-ui/Page';
import { Header, TitleSize } from 'azure-devops-ui/Header';
import { Card } from 'azure-devops-ui/Card';
import commandBarItemsSimple from './commandBarItemsSimple';

const newDetailsContent = {
  renderContent: item => (
    <Page className="flex-grow">
      <Header
        title={item.component}
        description={`Created by ${item.userName}`}
        commandBarItems={commandBarItemsSimple}
        titleSize={TitleSize.Large}
      />
      <div className="page-content page-content-top">
        <Card
          className="page-content"
          contentProps={{ contentPadding: false }}
        >

          <div className="flex-row">

            <div className="flex-column">
              <div className="body-m secondary-text">{item.userName}</div>
              <div className="body-m primary-text">{item.date}</div>
            </div>

          </div>
        </Card>
      </div>
    </Page>
  ),
};

export default newDetailsContent;
