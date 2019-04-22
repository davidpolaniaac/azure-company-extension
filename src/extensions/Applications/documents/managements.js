import { createDocument } from '../storage/storage';
import DOCUMENTS from './constants';

export async function createDocumentManagement(values) {
  return createDocument(DOCUMENTS.MANAGEMENTS, values);
}
