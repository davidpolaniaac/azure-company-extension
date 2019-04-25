import { ACTIONS } from '../../constants/actions';

const commandBarItems = (showDialog, element) => [
  {
    iconProps: {
      iconName: 'Add',
    },
    id: 'create',
    important: false,
    onActivate: () => {
      showDialog(element, ACTIONS.CREATE);
    },
    text: `New ${element}`,
    tooltipProps: {
      text: `${element}`,
    },
  },
  {
    iconProps: {
      iconName: 'Delete',
    },
    id: 'delete',
    important: false,
    onActivate: () => {
      showDialog(element, ACTIONS.DELETE);
    },
    text: `Delete ${element}`,
  },
  {
    iconProps: {
      iconName: 'Edit',
    },
    id: 'update',
    important: false,
    onActivate: () => {
      showDialog(element, ACTIONS.UPDATE);
    },
    text: `Update ${element}`,
  },
];

export default commandBarItems;
