import { getDataManager, normalizeData } from './utlis';

export async function createDocument(documentName, value) {
  const dataManager = await getDataManager();
  const data = await normalizeData(value);
  return dataManager.setDocument(documentName, data);
}

export async function getDocuments(documentName) {
  const dataManager = await getDataManager();
  return dataManager.getDocuments(documentName);
}

export async function deleteDocument(documentName, value) {
  const dataManager = await getDataManager();
  return dataManager.deleteDocument(documentName, value.id);
}

export async function updateDocument(documentName, value) {
  const dataManager = await getDataManager();
  const data = await normalizeData(value);
  return dataManager.updateDocument(documentName, data);
}

