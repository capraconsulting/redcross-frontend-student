import azure from 'azure-storage';
import azureConfig from '../../azureconfig.js';

export const fileService = azure.createFileService(
  azureConfig.accountName,
  azureConfig.accountKey,
);
