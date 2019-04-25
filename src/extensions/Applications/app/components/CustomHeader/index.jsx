import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, TitleSize } from 'azure-devops-ui/Header';
import { actionCreators as dialogActions } from '../../../redux/dialog/actions';

class CustomHeader extends Component {
  componentDidMount() {

  }

  render() {
    const {
      showDialog, CommandBarItems, title, description, element,
    } = this.props;
    return (
      <Header
        title={title}
        description={description ? `Created by ${description}` : ''}
        commandBarItems={CommandBarItems(showDialog, element)}
        titleSize={TitleSize.Large}
      />
    );
  }
}

CustomHeader.propTypes = {
  showDialog: PropTypes.func.isRequired,
  CommandBarItems: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  element: PropTypes.string.isRequired,
  description: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  showDialog: (text, color) => dispatch(dialogActions.showDialog(text, color)),
});

export default connect(null, mapDispatchToProps)(CustomHeader);
