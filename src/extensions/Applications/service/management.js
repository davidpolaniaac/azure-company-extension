import { createDocumentManagement } from '../documents/managements';

const services = {
  createDocument: values => createDocumentManagement(values)
    .then(response => ({ ok: true, ...response }))
    .catch(error => ({ ok: false, ...error })),
};

export default services;
