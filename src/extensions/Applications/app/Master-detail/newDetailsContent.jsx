import React from 'react';
import { Page } from 'azure-devops-ui/Page';
import { Card } from 'azure-devops-ui/Card';
import commandBarItemsComponent from './commandBarItemsComponent';
import CustomHeader from '../components/CustomHeader';

const newDetailsContent = {
  renderContent: item => (
    <Page className="flex-grow">
      <CustomHeader
        title={item.component}
        description={item.userName}
        CommandBarItems={commandBarItemsComponent}
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
