import * as React from 'react';
import * as SDK from 'azure-devops-extension-sdk';
import PropTypes from 'prop-types';
import {
  BaseMasterDetailsContext,
  bindSelectionToObservable,
  MasterDetailsContext,
} from 'azure-devops-ui/MasterDetailsContext';
import { DetailsPanel, MasterPanel, MasterPanelHeader } from 'azure-devops-ui/MasterDetails';
import { ObservableValue } from 'azure-devops-ui/Core/Observable';
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider';
import { List, ListItem, ListSelection } from 'azure-devops-ui/List';
import { Header, TitleSize } from 'azure-devops-ui/Header';
import { TextField } from 'azure-devops-ui/TextField';
import { Card } from 'azure-devops-ui/Card';
import {
  SimpleTableCell,
  Table,
  TwoLineTableCell,
} from 'azure-devops-ui/Table';
import { Page } from 'azure-devops-ui/Page';
import { Observer } from 'azure-devops-ui/Observer';
import DialogCreateManagement from './Dialog/DialogCreateManagement';

const isDialogOpen = new ObservableValue(false);

const SampleData = [
  {
    management: 'Negocios Bancolombia',
    userName: 'Lucas Espinal',
    date: '2019-03-03',
    applications: [
      {
      },
    ],
  },
];

export const commandBarItemsSimple = [
  {
    iconProps: {
      iconName: 'Add',
    },
    id: 'testCreate',
    important: true,
    onActivate: () => {
      console.log('activo el dialogo');
      isDialogOpen.value = true;
    },
    text: 'Add',
    tooltipProps: {
      text: 'Custom tooltip for create',
    },
  },
  {
    iconProps: {
      iconName: 'Delete',
    },
    id: 'testDelete',
    important: false,
    onActivate: () => {
      alert('submenu clicked');
    },
    text: 'Menu row with delete icon',
  },
  {
    iconProps: {
      iconName: 'Share',
    },
    id: 'testShare',
    important: false,
    onActivate: () => {
      alert('submenu clicked');
    },
    text: 'Menu row with share icon',
  },
];

const initialPayload = {
  key: 'initial',
  masterPanelContent: {
    renderContent: (parentItem, initialSelectedMasterItem) => (
      <InitialMasterPanelContent initialSelectedMasterItem={initialSelectedMasterItem} />
    ),
    renderHeader: () => (
      <Header
        title="Mgmt"
        commandBarItems={commandBarItemsSimple}
        titleSize={TitleSize.Large}
      />
    ),
    renderSearch: () => (
      <TextField prefixIconProps={{ iconName: 'Search' }} placeholder="Search managerment" />
    ),
    onBackButtonClick: () => false,
  },
  detailsContent: {
    renderContent: item => <InitialDetailView detailItem={item} />,
  },
  selectedMasterItem: new ObservableValue(SampleData[0]),
  parentItem: undefined,
};

const renderNewRow = (
  index,
  item,
  details,
  key,
) => (
  <ListItem
    className="master-example-row"
    key={key || `list-item${index}`}
    index={index}
    details={details}
  >
    <div className="flex-row flex-center h-scroll-hidden" style={{ padding: '10px 0px' }}>
      <div className="flex-noshrink" style={{ width: '56px' }} />
      <div className="flex-column flex-shrink" style={{ minWidth: 0 }}>
        <div className="primary-text text-ellipsis">{item.component}</div>
        <div className="secondary-text">{item.userName}</div>
      </div>
    </div>
  </ListItem>
);

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


const newMasterPanelContent = {
  renderContent: (parentItem, initialSelectedMasterItem) => {
    const itemProvider = new ArrayItemProvider(parentItem.components);
    const selection = new ListSelection();
    bindSelectionToObservable(selection, itemProvider, initialSelectedMasterItem);
    return (
      <List
        key="new-list"
        itemProvider={itemProvider}
        selection={selection}
        renderRow={renderNewRow}
        width="100%"
      />
    );
  },
  renderHeader: parentItem => (
    <MasterPanelHeader
      title={parentItem.application}
      subTitle={`Created by ${parentItem.userName}`}
    />
  ),
  renderSearch: () => (
    <TextField prefixIconProps={{ iconName: 'Search' }} placeholder="Search component" />
  ),
};


const InitialDetailView = (props) => {
  const masterDetailsContext = React.useContext(MasterDetailsContext);
  const { detailItem } = props;

  const renderCommitNameCell = (
    rowIndex,
    columnIndex,
    tableColumn,
    tableItem,
  ) => (
    <TwoLineTableCell
      columnIndex={columnIndex}
      className="fontWeightSemiBold fontSizeM scroll-hidden"
      key={`col-${columnIndex}`}
      tableColumn={tableColumn}
      line1={<span className="fontSizeM text-ellipsis">{tableItem.application}</span>}
      line2={
        <span className="fontSize secondary-text flex-center text-ellipsis">
          {tableItem.userName}
        </span>
              }
    />
  );

  const renderDateColumn = (
    rowIndex,
    columnIndex,
    tableColumn,
    tableItem,
  ) => (
    <SimpleTableCell
      key={`col-${columnIndex}`}
      columnIndex={columnIndex}
      tableColumn={tableColumn}
    >
      <div>{tableItem.date}</div>
    </SimpleTableCell>
  );

  const columns = [
    {
      id: 'applications',
      name: 'Applications',
      width: new ObservableValue(-33),
      renderCell: renderCommitNameCell,
    },
    {
      id: 'date',
      name: 'Date',
      width: new ObservableValue(-33),
      renderCell: renderDateColumn,
    },
  ];

  const onRowActivated = (event, tableRow) => {
    const item = tableRow.data.components[0] ? tableRow.data.components[0] : {};
    const newPayload = {
      key: 'commit-details',
      masterPanelContent: newMasterPanelContent,
      detailsContent: newDetailsContent,
      selectedMasterItem: new ObservableValue(item),
      parentItem: tableRow.data,
    };

    masterDetailsContext.push(newPayload);
  };

  return (
    <Page>
      <Header
        title={detailItem.management}
        description={`Created by ${detailItem.userName}`}
        commandBarItems={commandBarItemsSimple}
        titleSize={TitleSize.Large}
      />
      <div className="page-content page-content-top">
        <Card
          className="bolt-card-no-vertical-padding"
          contentProps={{ contentPadding: false }}
        >
          <Table
            columns={columns}
            itemProvider={new ArrayItemProvider(detailItem.applications)}
            showLines
            singleClickActivation
            onActivate={onRowActivated}
          />
        </Card>
      </div>
    </Page>
  );
};


InitialDetailView.propTypes = {
  detailItem: PropTypes.element.isRequired,
};

const renderInitialRow = (
  index,
  item,
  details,
  key,
) => (
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


const InitialMasterPanelContent = (props) => {
  const [initialItemProvider] = React.useState(new ArrayItemProvider(SampleData));
  const [initialSelection] = React.useState(new ListSelection());

  React.useEffect(() => {
    bindSelectionToObservable(
      initialSelection,
      initialItemProvider,
      props.initialSelectedMasterItem,
    );
  });

  return (
    <List
      itemProvider={initialItemProvider}
      selection={initialSelection}
      renderRow={renderInitialRow}
      width="100%"
    />
  );
};


const masterDetailsContext = new BaseMasterDetailsContext(
  initialPayload,
  () => {
    alert("Triggered onExit; this shouldn't happen ever in this example");
  },
);

export default class App extends React.Component {
  componentDidMount() {
    SDK.init();
    SDK.ready();
  }

  onDismiss = () => {
    isDialogOpen.value = false;
  }

  render() {
    return (
      <>

        <Observer isDialogOpen={isDialogOpen}>
          {props => (props.isDialogOpen ? (
            <DialogCreateManagement onDismiss={this.onDismiss} />
                        ) : null)}
        </Observer>


        <MasterDetailsContext.Provider value={masterDetailsContext}>
          <div className="flex-row" style={{ width: '100%' }}>
            <MasterPanel showOnSmallScreens />
            <DetailsPanel />
          </div>
        </MasterDetailsContext.Provider>


      </>
    );
  }
}
