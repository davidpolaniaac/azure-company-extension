import { createDocumentManagement, getDocumentManagements } from '../documents/managements';

const services = {
  createDocument: values => createDocumentManagement(values)
    .then(response => ({ ok: true, ...response }))
    .catch(error => ({ ok: false, ...error })),
  getDocuments: () => getDocumentManagements()
    .then(response => ({ ok: true, ...response }))
    .catch(error => ({ ok: false, ...error })),
};

export default services;
