import * as SDK from 'azure-devops-extension-sdk';
import { CommonServiceIds } from 'azure-devops-extension-api';

export async function createDocumentDomain(value) {
  console.log('value jaja: ', value);
  const service = await SDK.getService(CommonServiceIds.ExtensionDataService);
  const applications = {
    name: 'Canales y tarjetas',
  };
  await service.createDocument('Domains', applications);
}

