import * as SDK from 'azure-devops-extension-sdk';

async function getDataManager() {
  await SDK.ready();
  const accessToken = await SDK.getAccessToken();
  const service = await SDK.getService('ms.vss-features.extension-data-service');
  return service.getExtensionDataManager(SDK.getExtensionContext().id, accessToken);
}

export async function createDocument(documentName, value) {
  const dataManager = await getDataManager();
  return dataManager.setDocument(documentName, value);
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
  return dataManager.updateDocument(documentName, value);
}

