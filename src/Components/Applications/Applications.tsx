import { Card } from "azure-devops-ui/Card";
import { IObservableValue, ObservableValue } from "azure-devops-ui/Core/Observable";
import { Header, TitleSize } from "azure-devops-ui/Header";
import { IListItemDetails, List, ListItem, ListSelection } from "azure-devops-ui/List";
import { DetailsPanel, MasterPanel, MasterPanelHeader } from "azure-devops-ui/MasterDetails";
import {
    BaseMasterDetailsContext,
    bindSelectionToObservable,
    createChildLayer,
    IDetailsAreaContent,
    IMasterDetailsContext,
    IMasterDetailsContextLayer,
    IMasterPanelContent,
    MasterDetailsContext
} from "azure-devops-ui/MasterDetailsContext";
import { Page } from "azure-devops-ui/Page";
import {
    ITableColumn,
    ITableRow,
    SimpleTableCell,
    Table,
    TwoLineTableCell
} from "azure-devops-ui/Table";
import { TextField } from "azure-devops-ui/TextField";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";
import { showRootComponent } from "../../Common";
import { commandBarItemsSimple } from "./HeaderData";

interface ISamplePullRequestData {
    commits: ICommitDetails[];
    pullRequestTitle: string;
    userImageUrl: string;
    userName: string;
}

interface ICommitDetails {
    date: string;
    description: string;
    hash: string;
}

const SampleData: ISamplePullRequestData[] = [
    {
        pullRequestTitle: "Added GitHub aliases",
        userImageUrl: "/persona-male.png",
        userName: "Cecil Folk",
        commits: [
            { description: "Finalized GitHub aliases", hash: "abc123", date: "2019-03-05" },
            { description: "Added Configuration", hash: "def456", date: "2019-03-04" },
            { description: "Updated CSS", hash: "ghi789", date: "2019-03-03" },
            { description: "Constructed pylons", hash: "123abc", date: "2019-03-02" }
        ]
    },
    {
        pullRequestTitle: "Remove reference to Design System components",
        userImageUrl: "/persona-male.png",
        userName: "Henry Bill",
        commits: [
            { description: "Finalized GitHub aliases", hash: "abc123", date: "2019-03-05" },
            { description: "Added Configuration", hash: "def456", date: "2019-03-04" }
        ]
    },
    {
        pullRequestTitle: "Using new design/pattern/components",
        userImageUrl: "/persona-female.png",
        userName: "Ashley McCarthy",
        commits: [
            { description: "Updated CSS", hash: "ghi789", date: "2019-03-03" },
            { description: "Constructed pylons", hash: "123abc", date: "2019-03-02" }
        ]
    }
];

const renderInitialRow = (
    index: number,
    item: ISamplePullRequestData,
    details: IListItemDetails<ISamplePullRequestData>,
    key?: string
): JSX.Element => {
    return (
        <ListItem
            className="master-example-row"
            key={key || "list-item" + index}
            index={index}
            details={details}
        >
            <div className="flex-row flex-center h-scroll-hidden" style={{ padding: "10px 0px" }}>
                <div className="flex-noshrink" style={{ width: "32px" }} />
                <div className="flex-column flex-shrink" style={{ minWidth: 0 }}>
                    <div className="primary-text text-ellipsis">{item.pullRequestTitle}</div>
                    <div className="secondary-text">{item.userName}</div>
                </div>
            </div>
        </ListItem>
    );
};

const initialPayload: IMasterDetailsContextLayer<ISamplePullRequestData, undefined> = {
    key: "initial",
    masterPanelContent: {
        renderContent: (parentItem, initialSelectedMasterItem) => (
            <InitialMasterPanelContent initialSelectedMasterItem={initialSelectedMasterItem} />
        ),
        renderHeader: () => (
            <Header
                title={"Apps"}
                commandBarItems={commandBarItemsSimple}
                titleSize={TitleSize.Large}
            />
        ),
        renderSearch: () => (
            <TextField prefixIconProps={{ iconName: "Search" }} placeholder="Search doesn't work" />
        ),
        onBackButtonClick: () => {
            alert(
                "Home"
            );
            return false;
        }
    },
    detailsContent: {
        renderContent: item => <InitialDetailView detailItem={item} />
    },
    selectedMasterItem: new ObservableValue<ISamplePullRequestData>(SampleData[0]),
    parentItem: undefined
};

const InitialMasterPanelContent: React.FunctionComponent<{
    initialSelectedMasterItem: IObservableValue<ISamplePullRequestData>;
}> = props => {
    const [initialItemProvider] = React.useState(new ArrayItemProvider(SampleData));
    const [initialSelection] = React.useState(new ListSelection());

    React.useEffect(() => {
        bindSelectionToObservable(
            initialSelection,
            initialItemProvider,
            props.initialSelectedMasterItem
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

const InitialDetailView: React.FunctionComponent<{
    detailItem: ISamplePullRequestData;
}> = props => {
    const masterDetailsContext = React.useContext(MasterDetailsContext);
    const { detailItem } = props;

    const renderCommitNameCell = (
        rowIndex: number,
        columnIndex: number,
        tableColumn: ITableColumn<ICommitDetails>,
        tableItem: ICommitDetails
    ) => {
        return (
            <TwoLineTableCell
                columnIndex={columnIndex}
                className="fontWeightSemiBold fontSizeM scroll-hidden"
                key={"col-" + columnIndex}
                tableColumn={tableColumn}
                line1={<span className="fontSizeM text-ellipsis">{tableItem.description}</span>}
                line2={
                    <span className="fontSize secondary-text flex-center text-ellipsis">
                        {tableItem.hash}
                    </span>
                }
            />
        );
    };

    const renderDateColumn = (
        rowIndex: number,
        columnIndex: number,
        tableColumn: ITableColumn<ICommitDetails>,
        tableItem: ICommitDetails
    ) => {
        return (
            <SimpleTableCell
                key={"col-" + columnIndex}
                columnIndex={columnIndex}
                tableColumn={tableColumn}
            >
                <div>{tableItem.date}</div>
            </SimpleTableCell>
        );
    };

    const columns: Array<ITableColumn<ICommitDetails>> = [
        {
            id: "description",
            name: "Commit",
            width: new ObservableValue(-33),
            renderCell: renderCommitNameCell
        },
        { id: "date", name: "Date", width: new ObservableValue(-33), renderCell: renderDateColumn }
    ];

    const onRowActivated = (event: any, tableRow: ITableRow<ICommitDetails>) => {
        const newPayload = createChildLayer(
            "commit-details",
            newMasterPanelContent,
            newDetailsContent,
            tableRow.data,
            initialPayload
        );
        masterDetailsContext.push(newPayload);
    };

    return (
        <Page>
            <Header
                description={"Created by " + detailItem.userName}
                title={detailItem.pullRequestTitle}
                titleSize={TitleSize.Large}
            />
            <div className="page-content page-content-top">
                <Card
                    className="bolt-card-no-vertical-padding"
                    contentProps={{ contentPadding: false }}
                >
                    <Table<ICommitDetails>
                        columns={columns}
                        itemProvider={new ArrayItemProvider<ICommitDetails>(detailItem.commits)}
                        showLines={true}
                        singleClickActivation={true}
                        onActivate={onRowActivated}
                    />
                </Card>
            </div>
        </Page>
    );
};

const renderNewRow = (
    index: number,
    item: ICommitDetails,
    details: IListItemDetails<ICommitDetails>,
    key?: string
): JSX.Element => {
    return (
        <ListItem
            className="master-example-row"
            key={key || "list-item" + index}
            index={index}
            details={details}
        >
            <div className="flex-row flex-center h-scroll-hidden" style={{ padding: "10px 0px" }}>
                <div className="flex-noshrink" style={{ width: "56px" }} />
                <div className="flex-column flex-shrink" style={{ minWidth: 0 }}>
                    <div className="primary-text text-ellipsis">{item.description}</div>
                    <div className="secondary-text">{item.hash}</div>
                </div>
            </div>
        </ListItem>
    );
};

const newMasterPanelContent: IMasterPanelContent<ICommitDetails, ISamplePullRequestData> = {
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
    renderHeader: parentItem => {
        return (
            <MasterPanelHeader
                title={parentItem.pullRequestTitle}
                subTitle={`Created by ${parentItem.userName}`}
            />
        );
    }
};

const newDetailsContent: IDetailsAreaContent<ICommitDetails> = {
    renderContent: item => (
        <div>
            {item.description} - {item.hash} - {item.date}
        </div>
    )
};

const masterDetailsContext: IMasterDetailsContext = new BaseMasterDetailsContext(
    initialPayload,
    () => {
        alert("Triggered onExit; this shouldn't happen ever in this app !");
    }
);

class Applications extends React.Component<any, any> {

    public componentDidMount() {
        SDK.init();
    }

    public render(): JSX.Element {
        return (
            <MasterDetailsContext.Provider value={masterDetailsContext}>
                <div className="flex-row" style={{ width: "100%" }}>
                    <MasterPanel showOnSmallScreens={true}/>
                    <DetailsPanel />
                </div>
            </MasterDetailsContext.Provider>
        );
    }
}

showRootComponent(<Applications />);