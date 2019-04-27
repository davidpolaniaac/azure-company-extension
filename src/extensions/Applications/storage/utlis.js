import * as SDK from 'azure-devops-extension-sdk';
import { getDateFull } from '../app/utils';
import { GENERIC_FIELDS } from '../constants/fields';

export async function getDataManager() {
  const accessToken = await SDK.getAccessToken();
  const service = await SDK.getService('ms.vss-features.extension-data-service');
  return service.getExtensionDataManager(SDK.getExtensionContext().id, accessToken);
}

export async function getDocumentByName(collectionName, value) {
  try {
    const dataManager = await getDataManager();
    const docuemnts = await dataManager.getDocuments(collectionName);
    const data = docuemnts.find(document => document[GENERIC_FIELDS.NAME] === value);
    return data;
  } catch (error) {
    return undefined;
  }
}

export async function normalizeData(value) {
  const userName = SDK.getUser().displayName;
  const date = getDateFull();
  const data = {
    userName, date, ...value,
  };
  return data;
}

