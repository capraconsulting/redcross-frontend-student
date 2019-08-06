import azure from 'azure-storage/browser/azure-storage.blob.export';

//Interfaces
import { IFile } from '../interfaces';

//Configs
import { azureTokens } from '../../config';

//Creates Azure Storage Blob Service with restricred access
export const blobService = azure.createBlobService(
  azureTokens.CONNECTION_STRING,
);
/**
 * Uploads file to azure blob storage.
 * Returns promise that returns the uploaded file's URL inside object of type IFile - See interfaces/IFile.
 * The blob storage works as a virtual file system.
 * */

export const uploadFileToAzureBlobStorage = async (
  share: string,
  directory: string,
  file,
) => {
  return new Promise<IFile>((resolve, reject) => {
    blobService.createContainerIfNotExists(share, function() {
      blobService.createBlockBlobFromBrowserFile(
        share,
        directory + '/' + file.name,
        file,
        function(error, result) {
          if (!error) {
            const { container, name } = result;
            const fileLink = blobService.getUrl(
              container,
              name,
              azureTokens.PUBLIC_SAS_TOKEN,
            );
            let promisedFile: IFile = {
              share,
              directory,
              fileName: file.name,
              fileUrl: fileLink + '&sr=b&sv=2018-03-28',
            };
            resolve(promisedFile);
          } else {
            reject();
          }
        },
      );
    });
  });
};
