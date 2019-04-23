const commandBarItemsSimple = [
  {
    iconProps: {
      iconName: 'Add',
    },
    id: 'testCreate',
    important: true,
    onActivate: () => {
      alert('activo el dialogo');
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

export default commandBarItemsSimple;
