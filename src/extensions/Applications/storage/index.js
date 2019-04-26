import { getDataManager, normalizeData, getDocumentByName } from './utlis';
import { GENERIC_FIELDS } from '../constants/fields';

export async function createDocument(collectionName, value) {
  const dataManager = await getDataManager();
  let data = await getDocumentByName(collectionName, value[GENERIC_FIELDS.NAME]);
  data = typeof (data) === 'undefined' ? await normalizeData(value) : undefined;
  return dataManager.createDocument(collectionName, data);
}

export async function getDocuments(collectionName) {
  const dataManager = await getDataManager();
  return dataManager.getDocuments(collectionName);
}

export async function deleteDocument(collectionName, value) {
  const dataManager = await getDataManager();
  const data = await getDocumentByName(collectionName, value[GENERIC_FIELDS.NAME]);
  return dataManager.deleteDocument(collectionName, data.id);
}

export async function updateDocument(collectionName, value) {
  const dataManager = await getDataManager();
  const data = await getDocumentByName(collectionName, value[GENERIC_FIELDS.NAME]);
  data[GENERIC_FIELDS.NAME] = value[GENERIC_FIELDS.NEW_NAME];
  return dataManager.updateDocument(collectionName, data);
}
