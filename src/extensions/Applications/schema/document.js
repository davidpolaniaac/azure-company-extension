import { GENERIC_FIELDS } from '../constants/fields';

export const normalizeValue = (collection, values) => ({
  [GENERIC_FIELDS.COLLECTION]: collection,
  ...values,
});
