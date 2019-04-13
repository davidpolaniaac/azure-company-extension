import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import * as SDK from "azure-devops-extension-sdk";
import { CommonServiceIds, IHostPageLayoutService } from "azure-devops-extension-api";
import { Dialog } from "azure-devops-ui/Dialog";

export const commandBarItemsSimple: IHeaderCommandBarItem[] = [
    {
        iconProps: {
            iconName: "Add"
        },
        id: "testCreate",
        important: true,
        onActivate: () => { onPanelClick() },
        text: "Action",
        tooltipProps: {
            text: "Custom tooltip for create"
        },
    }, 
    {
        iconProps: {
            iconName: "Delete"
        },
        id: "testDelete",
        important: false,
        onActivate: () => {
            alert("submenu clicked");
        },
        text: "Menu row with delete icon"
    },
    {
        iconProps: {
            iconName: "Share"
        },
        id: "testShare",
        important: false,
        onActivate: () => {
            alert("submenu clicked");
        },
        text: "Menu row with share icon"
    }
];


async function onPanelClick(): Promise<void> {
    const dialogService = await SDK.getService<IHostPageLayoutService>(CommonServiceIds.HostPageLayoutService);
    dialogService.openCustomDialog<boolean | undefined>(SDK.getExtensionContext().id + ".panel-content", {
        title: "Create applications",
        configuration: {
            message: "avoid creating duplicates !",
            initialValue: "David Polania"
        },
        onClose: (result) => {
            if (result !== undefined) {
                console.log(result);
            }
        }
    });
}