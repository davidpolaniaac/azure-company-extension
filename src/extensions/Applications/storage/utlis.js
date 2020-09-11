import * as SDK from 'azure-devops-extension-sdk';
import md5 from 'md5';
import { getDateFull } from '../app/utils';
import { GENERIC_FIELDS } from '../constants/fields';

export async function getDataManager() {
  const accessToken = await SDK.getAccessToken();
  const service = await SDK.getService('ms.vss-features.extension-data-service');
  return service.getExtensionDataManager(SDK.getExtensionContext().id, accessToken);
}

export async function getProjectId() {
  const service = await SDK.getService('ms.vss-tfs-web.tfs-page-data-service');
  const project = await service.getProject();
  return project.id
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
  const projectId = await getProjectId();
  const name = value[GENERIC_FIELDS.NAME].trim().toLowerCase();
  const date = getDateFull();
  const id = md5(projectId+name);
  const data = {
    id, userName, date, ...value,
  };
  return data;
}

