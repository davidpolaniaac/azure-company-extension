import { createDocumentDomain } from '../app/Documents/Domain';

const services = {
  createDocument: values => createDocumentDomain(values)
    .then(response => ({ ok: true, ...response }))
    .catch(error => ({ ok: false, ...error })),
};

export default services;
