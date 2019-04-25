import { getDataManager, normalizeData, createKeyHash } from './utlis';
import { GENERIC_FIELDS } from '../constants/fields';

export async function createDocument(documentName, value) {
  const dataManager = await getDataManager();
  const data = await normalizeData(value);
  return dataManager.createDocument(documentName, data);
}

export async function getDocuments(documentName) {
  const dataManager = await getDataManager();
  return dataManager.getDocuments(documentName);
}

export async function deleteDocument(documentName, value) {
  const dataManager = await getDataManager();
  const id = createKeyHash(value);
  return dataManager.deleteDocument(documentName, id);
}

export async function updateDocument(documentName, value) {
  const dataManager = await getDataManager();
  const newValue = { name: value[GENERIC_FIELDS.NEW_NAME] };
  const data = await normalizeData(newValue);
  const oldId = createKeyHash(value[GENERIC_FIELDS.NAME]);
  await dataManager.deleteDocument(documentName, oldId);
  return dataManager.createDocument(documentName, data);
}
