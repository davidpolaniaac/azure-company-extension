const commandBarItemsComponent = showDialog => [
  {
    iconProps: {
      iconName: 'Add',
    },
    id: 'create',
    important: false,
    onActivate: () => {
      showDialog('Create component', 'createcomponent');
    },
    text: 'New component',
    tooltipProps: {
      text: 'New component',
    },
  },
  {
    iconProps: {
      iconName: 'Delete',
    },
    id: 'delete',
    important: false,
    onActivate: () => {
      showDialog('Delete component', 'deletecomponent');
    },
    text: 'Delete component',
  },
  {
    iconProps: {
      iconName: 'Edit',
    },
    id: 'update',
    important: false,
    onActivate: () => {
      showDialog('Update component', 'updatecomponent');
    },
    text: 'Update component',
  },
];

export default commandBarItemsComponent;
