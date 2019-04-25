import { createDocument, getDocuments, deleteDocument, updateDocument } from '../storage';
import { DOCUMENTS } from './constants';

export async function createDocumentManagement(values) {
  return createDocument(DOCUMENTS.MANAGEMENTS, values);
}

export async function getDocumentManagements() {
  return getDocuments(DOCUMENTS.MANAGEMENTS);
}

export async function deleteDocumentManagement(values) {
  return deleteDocument(DOCUMENTS.MANAGEMENTS, values);
}

export async function updateDocumentManagement(values) {
  return updateDocument(DOCUMENTS.MANAGEMENTS, values);
}
