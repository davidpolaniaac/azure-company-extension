import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FILTER_CHANGE_EVENT } from 'azure-devops-ui/Utilities/Filter';
import { filterItems } from '../utils';


function FilterMasterPanelContent(props) {
  const [data, setData] = React.useState(props.components);
  const { Component } = props;

  const onFilterChanged = () => {
    const filteredItems = filterItems(data, props.filter, props.filterKey);
    setData(filteredItems);
  };

  React.useEffect(() => {
    setData(props.components);
  }, [props.components]);

  React.useEffect(() => {
    props.filter.subscribe(onFilterChanged, FILTER_CHANGE_EVENT);
    return function cleanup() {
      props.filter.unsubscribe(onFilterChanged, FILTER_CHANGE_EVENT);
    };
  });

  return (
    <Component initialSelectedMasterItem={props.initialSelectedMasterItem} data={data} />
  );
}


FilterMasterPanelContent.propTypes = {
  components: PropTypes.arrayOf().isRequired,
  filter: PropTypes.element.isRequired,
  filterKey: PropTypes.string.isRequired,
  Component: PropTypes.element.isRequired,
  initialSelectedMasterItem: PropTypes.element.isRequired,
};

const mapStateToProps = state => ({
  components: state.components.components,
});

export default connect(mapStateToProps, null)(FilterMasterPanelContent);
