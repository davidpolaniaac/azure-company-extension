import { GENERIC_FIELDS } from '../constants/fields';

export const normalizeValue = (collection, values) => {
  console.log('norcollection', collection);
  console.log('norvalues', values);
  return {
    [GENERIC_FIELDS.COLLECTION]: collection,
    ...values,
  };
};

