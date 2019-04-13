import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";
import { showRootComponent } from "../../Common";
import { Page } from "azure-devops-ui/Page";
import { Header, TitleSize } from "azure-devops-ui/Header";

class Tree extends React.Component<any, any> {

    public componentDidMount() {
        SDK.init();
    }

    public render(): JSX.Element {
        return (
            <Page className="sample-hub flex-grow">

                <Header title="Tree"
                    titleSize={TitleSize.Large} />
            
                <div className="page-content">
                    <div>Coming soon</div>
                </div>

            </Page>

        );
    }
}

showRootComponent(<Tree />);
