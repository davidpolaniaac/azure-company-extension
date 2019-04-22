import * as SDK from 'azure-devops-extension-sdk';
import { getDateFull } from '../app/utils';

export async function getDataManager() {
  await SDK.ready();
  const accessToken = await SDK.getAccessToken();
  const service = await SDK.getService('ms.vss-features.extension-data-service');
  return service.getExtensionDataManager(SDK.getExtensionContext().id, accessToken);
}

export async function normalizeData(value) {
  await SDK.ready();
  const userName = SDK.getUser().displayName;
  const date = getDateFull();
  const data = { userName, date, ...value };
  return data;
}
