import * as SDK from 'azure-devops-extension-sdk';
import hash from 'object-hash';
import { getDateFull } from '../app/utils';

export const createKeyHash = value => hash(value);

export async function getDataManager() {
  await SDK.ready();
  const accessToken = await SDK.getAccessToken();
  const service = await SDK.getService('ms.vss-features.extension-data-service');
  return service.getExtensionDataManager(SDK.getExtensionContext().id, accessToken);
}

export async function normalizeData(value) {
  await SDK.ready();
  const userName = SDK.getUser().displayName;
  console.log('crear hash', value);
  const id = createKeyHash(value);
  const date = getDateFull();
  const data = {
    id, userName, date, ...value,
  };
  return data;
}

