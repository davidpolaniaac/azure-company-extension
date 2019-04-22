import { createDocument, getDocuments } from '../storage/storage';
import { DOCUMENTS } from './constants';

export async function createDocumentManagement(values) {
  return createDocument(DOCUMENTS.MANAGEMENTS, values);
}

export async function getDocumentManagements() {
  return getDocuments(DOCUMENTS.MANAGEMENTS);
}
