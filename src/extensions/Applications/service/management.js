import {
  createDocumentManagement,
  getDocumentManagements,
  deleteDocumentManagement,
  updateDocumentManagement,
} from '../documents/managements';

const services = {
  createDocument: values => createDocumentManagement(values)
    .then(response => ({ ok: true, ...response }))
    .catch(error => ({ ok: false, ...error })),
  getDocuments: () => getDocumentManagements()
    .then(values => ({ ok: true, values }))
    .catch(error => ({ ok: false, ...error })),
  deleteDocument: values => deleteDocumentManagement(values)
    .then(response => ({ ok: true, ...response }))
    .catch(error => ({ ok: false, ...error })),
  updateDocument: values => updateDocumentManagement(values)
    .then(response => ({ ok: true, ...response }))
    .catch(error => ({ ok: false, ...error })),
};

export default services;
