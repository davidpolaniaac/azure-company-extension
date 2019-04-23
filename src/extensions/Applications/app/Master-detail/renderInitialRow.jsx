import React from 'react';
import { ListItem } from 'azure-devops-ui/List';

function renderInitialRow(index, item, details, key) {
  return (
    <ListItem
      className="master-example-row"
      key={key || `list-item${index}`}
      index={index}
      details={details}
    >
      <div className="flex-row flex-center h-scroll-hidden" style={{ padding: '10px 0px' }}>
        <div className="flex-noshrink" style={{ width: '32px' }} />
        <div className="flex-column flex-shrink" style={{ minWidth: 0 }}>
          <div className="primary-text text-ellipsis">{item.management}</div>
          <div className="secondary-text">{item.userName}</div>
        </div>
      </div>
    </ListItem>
  );
}

export default renderInitialRow;
