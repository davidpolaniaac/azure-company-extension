import * as SDK from 'azure-devops-extension-sdk';

export async function createDocument(documentName, value) {
  await SDK.ready();
  const accessToken = await SDK.getAccessToken();
  const service = await SDK.getService('ms.vss-features.extension-data-service');
  const dataManager = await service.getExtensionDataManager(SDK.getExtensionContext().id, accessToken);
  return dataManager.createDocument(documentName, value);
}

