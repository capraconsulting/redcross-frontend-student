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

/**
 * Uploads file to azure file storage.
 * Returns promise that returns the uploaded file's URL inside object of type IFile - See interfaces/IFile.
 * 

// Creates Azure Fileservice with restricted access
export const fileService = azure.createFileService(
  azureTokens.CONNECTION_STRING,
);

export const uploadFileToAzureFileStorage = async (
  share: string,
  directory: string,
  file,
) => {
  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(file);
  const fileStream = new stream.Readable();
  return new Promise<IFile>((resolve, reject) => {
    fileReader.onload = () => {
      let myFileBuffer: ArrayBuffer = fileReader.result as ArrayBuffer;
      if (myFileBuffer) {
        fileStream.push(myFileBuffer[0]);
        fileStream.push(null);

        fileService.createDirectoryIfNotExists(share, directory, function() {
          fileService.createFileFromStream(
            share,
            directory,
            file.name,
            fileStream,
            myFileBuffer.byteLength,
            function(error, result) {
              if (!error) {
                const { share, directory, name } = result;
                const fileLink = fileService.getUrl(
                  share,
                  directory,
                  result.name,
                  azureTokens.PUBLIC_SAS_TOKEN,
                );
                let file: IFile = {
                  share,
                  directory,
                  fileName: name,
                  fileUrl: fileLink,
                };
                //azureTokens.PUBLIC_SAS_TOKEN +
                //'&sr=f&sv=2018-03-28',
                resolve(file);
              } else {
                reject();
              }
            },
          );
        });
      }
    };
  });
};
*/

/** KEEP TO USE IN FRIVILLIG APP TO HANDLE FILE AND DIRECTORY DELETION
  const handleDirectoryDelete = () => {
    console.log('Kjører frem til if check');
    files.length > 0 &&
      azureToken.length > 0 &&
      files.map((file, index) => {
        console.log(file);
        fileService.deleteFileIfExists(
          'questionfiles',
          azureToken,
          file.fileName,
          function(error, response) {
            if (!error) {
            }
          },
        );
        if (index == files.length - 1) {
          setFiles([] as IFile[]);
          fileService.deleteDirectoryIfExists(
            'questionfiles',
            azureToken,
            function(error, result, response) {
              if (!error) {
                console.log(result);
                console.log(response);
              }
            },
          );
        }
      });
  };*/
