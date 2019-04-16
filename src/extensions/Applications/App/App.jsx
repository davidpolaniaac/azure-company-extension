import * as React from 'react';
import * as SDK from 'azure-devops-extension-sdk';
import PropTypes from 'prop-types';
import {
  BaseMasterDetailsContext,
  bindSelectionToObservable,
  createChildLayer,
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
import DialogCreateApp from './Dialog/DialogCreateApp';

const isDialogOpen = new ObservableValue(false);

const SampleData = [
  {
    pullRequestTitle: 'Negocios Bancolombia',
    userImageUrl: '/persona-male.png',
    userName: 'Negocios',
    commits: [
      { description: 'Balance service', hash: 'abc123', date: '2019-03-05' },
      { description: 'Configuration', hash: 'def456', date: '2019-03-04' },
      { description: 'Authentication Service', hash: 'ghi789', date: '2019-03-03' },
    ],
  },
  {
    pullRequestTitle: 'app personas',
    userImageUrl: '/persona-male.png',
    userName: 'Henry Bill',
    commits: [
      { description: 'movil', hash: 'abc123', date: '2019-03-05' },
      { description: 'Servicio 1', hash: 'def456', date: '2019-03-04' },
    ],
  },
  {
    pullRequestTitle: 'Sitio transaccional',
    userImageUrl: '/persona-female.png',
    userName: 'Ashley McCarthy',
    commits: [
      { description: 'Web', hash: 'ghi789', date: '2019-03-03' },
      { description: 'Service', hash: '123abc', date: '2019-03-02' },
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
        title="Apps"
        commandBarItems={commandBarItemsSimple}
        titleSize={TitleSize.Large}
      />
    ),
    renderSearch: () => (
      <TextField prefixIconProps={{ iconName: 'Search' }} placeholder="Search application" />
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
        <div className="primary-text text-ellipsis">{item.description}</div>
        <div className="secondary-text">{item.hash}</div>
      </div>
    </div>
  </ListItem>
);

const newDetailsContent = {
  renderContent: item => (
    <div>
      {item.description} - {item.hash} - {item.date}
    </div>
  ),
};


const newMasterPanelContent = {
  renderContent: (parentItem, initialSelectedMasterItem) => {
    const itemProvider = new ArrayItemProvider(parentItem.commits);
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
      title={parentItem.pullRequestTitle}
      subTitle={`Created by ${parentItem.userName}`}
    />
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
      line1={<span className="fontSizeM text-ellipsis">{tableItem.description}</span>}
      line2={
        <span className="fontSize secondary-text flex-center text-ellipsis">
          {tableItem.hash}
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
      id: 'description',
      name: 'Commit',
      width: new ObservableValue(-33),
      renderCell: renderCommitNameCell,
    },
    {
      id: 'date', name: 'Date', width: new ObservableValue(-33), renderCell: renderDateColumn,
    },
  ];

  const onRowActivated = (event, tableRow) => {
    const newPayload = createChildLayer(
      'commit-details',
      newMasterPanelContent,
      newDetailsContent,
      tableRow.data,
      initialPayload,
    );
    masterDetailsContext.push(newPayload);
  };

  return (
    <Page>
      <Header
        description={`Created by ${detailItem.userName}`}
        title={detailItem.pullRequestTitle}
        titleSize={TitleSize.Large}
      />
      <div className="page-content page-content-top">
        <Card
          className="bolt-card-no-vertical-padding"
          contentProps={{ contentPadding: false }}
        >
          <Table
            columns={columns}
            itemProvider={new ArrayItemProvider(detailItem.commits)}
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
        <div className="primary-text text-ellipsis">{item.pullRequestTitle}</div>
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
  }

  onDismiss = () => {
    console.log('Hola', isDialogOpen.value);
    isDialogOpen.value = false;
  }


  render() {
    console.log(isDialogOpen.value);
    return (
      <>

        <Observer isDialogOpen={isDialogOpen}>
          {props => (props.isDialogOpen ? (
            <DialogCreateApp onDismiss={this.onDismiss} />
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
