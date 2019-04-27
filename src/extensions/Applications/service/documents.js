import { createDocumentStorage, getDocumentsStorage, deleteDocumentStorage, updateDocumentStorage } from '../storage';
import { GENERIC_FIELDS } from '../constants/fields';

const services = {
  createDocument: values => createDocumentStorage(values[GENERIC_FIELDS.COLLECTION], values)
    .then(response => ({ ok: true, ...response }))
    .catch(error => ({ ok: false, ...error })),
  getDocuments: values => getDocumentsStorage(values)
    .then(data => ({ ok: true, data }))
    .catch(error => ({ ok: false, ...error })),
  deleteDocument: values => deleteDocumentStorage(values[GENERIC_FIELDS.COLLECTION], values)
    .then(response => ({ ok: true, ...response }))
    .catch(error => ({ ok: false, ...error })),
  updateDocument: values => updateDocumentStorage(values[GENERIC_FIELDS.COLLECTION], values)
    .then(response => ({ ok: true, ...response }))
    .catch(error => ({ ok: false, ...error })),
};

export default services;
