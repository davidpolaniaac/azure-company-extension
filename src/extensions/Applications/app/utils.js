export function getDateFull() {
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const dateTime = `${date} ${time}`;
  return dateTime;
}

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const filterItems = (items, filter, filterKey) => {
  if (filter.hasChangesToReset()) {
    const filterText = filter.getFilterItemValue(filterKey);
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

