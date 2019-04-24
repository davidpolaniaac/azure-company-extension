const commandBarItemsManagement = showDialog => [
  {
    iconProps: {
      iconName: 'Add',
    },
    id: 'create',
    important: false,
    onActivate: () => {
      showDialog('Create management', 'createManagement');
    },
    text: 'New management',
    tooltipProps: {
      text: 'New management',
    },
  },
  {
    iconProps: {
      iconName: 'Delete',
    },
    id: 'delete',
    important: false,
    onActivate: () => {
      showDialog('Delete management', 'deleteManagement');
    },
    text: 'Delete management',
  },
  {
    iconProps: {
      iconName: 'Edit',
    },
    id: 'update',
    important: false,
    onActivate: () => {
      showDialog('Update management', 'updateManagement');
    },
    text: 'Update management',
  },
];

export default commandBarItemsManagement;
