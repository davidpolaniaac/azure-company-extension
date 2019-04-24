import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, TitleSize } from 'azure-devops-ui/Header';
import { actionCreators as dialogActions } from '../../../redux/dialog/actions';

class CustomHeader extends Component {
  componentDidMount() {
  }

  render() {
    const { showDialog, CommandBarItems, title, description } = this.props;
    return (
      <Header
        title={title}
        description={description ? `Created by ${description}` : ''}
        commandBarItems={CommandBarItems(showDialog)}
        titleSize={TitleSize.Large}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showDialog: (text, color) => dispatch(dialogActions.showDialog(text, color)),
});

export default connect(null, mapDispatchToProps)(CustomHeader);
