import React from 'react';
import { Dialog } from 'azure-devops-ui/Dialog';
import CreateApp from '../Form/CreateApp';

export default class DialogCreateApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  onSubmit(values) {
    console.log(values);
  }

  render() {
    const { onDismiss } = this.props;

    return (
      <Dialog
        titleProps={{ text: 'Create Application' }}
        onDismiss={(onDismiss)}
      >
        <CreateApp onSubmit={this.onSubmit} onDismiss={onDismiss} />

      </Dialog>
    );
  }
}
