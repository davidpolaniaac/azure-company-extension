import React from 'react';
import PropTypes from 'prop-types';
import { FILTER_CHANGE_EVENT } from 'azure-devops-ui/Utilities/Filter';
import InitialMasterPanelContent from './InitialMasterPanelContent';

function FilterMasterPanelContent(props) {
  const [data, setData] = React.useState(props.data);
  const filterItems = (items) => {
    if (props.filter.hasChangesToReset()) {
      const filterText = props.filter.getFilterItemValue('keyword');
      const filteredItems = items.filter((item) => {
        let includeItem = true;
        if (filterText) {
          includeItem = item.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
        }
        return includeItem;
      });
      return filteredItems;
    }
    return [...items];
  };

  const onFilterChanged = () => {
    const filteredItems = filterItems(props.data);
    setData(filteredItems);
  };

  React.useEffect(() => {
    setData(props.data);
  }, [props.data]);

  React.useEffect(() => {
    props.filter.subscribe(onFilterChanged, FILTER_CHANGE_EVENT);
    return function cleanup() {
      props.filter.unsubscribe(onFilterChanged, FILTER_CHANGE_EVENT);
    };
  });

  return (
    <InitialMasterPanelContent initialSelectedMasterItem={props.initialSelectedMasterItem} data={data} />
  );
}


FilterMasterPanelContent.propTypes = {
  data: PropTypes.arrayOf().isRequired,
  filter: PropTypes.element.isRequired,
  initialSelectedMasterItem: PropTypes.element.isRequired,
};


export default FilterMasterPanelContent;
