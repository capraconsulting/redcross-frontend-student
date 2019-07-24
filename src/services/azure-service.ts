import azure from 'azure-storage';
import azureConfig from '../../azureconfig.js';

export const fileService = azure.createFileService(
  azureConfig.SAS_TOKEN_RESTRICTED,
);
