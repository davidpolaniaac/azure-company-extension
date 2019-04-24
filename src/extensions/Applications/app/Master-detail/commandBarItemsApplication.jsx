const commandBarItemsApplication = showDialog => [
  {
    iconProps: {
      iconName: 'Add',
    },
    id: 'create',
    important: false,
    onActivate: () => {
      showDialog('Create application', 'createapplication');
    },
    text: 'New application',
    tooltipProps: {
      text: 'New application',
    },
  },
  {
    iconProps: {
      iconName: 'Delete',
    },
    id: 'delete',
    important: false,
    onActivate: () => {
      showDialog('Delete application', 'deleteapplication');
    },
    text: 'Delete application',
  },
  {
    iconProps: {
      iconName: 'Edit',
    },
    id: 'update',
    important: false,
    onActivate: () => {
      showDialog('Update application', 'updateapplication');
    },
    text: 'Update application',
  },
];

export default commandBarItemsApplication;
