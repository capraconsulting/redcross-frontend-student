//npm packages
import azure from 'azure-storage';
import stream from 'stream';

//Interfaces
import { IFile } from '../interfaces';

//Configs
import azureConfig from '../../azureconfig.js';

// Creates Azure Fileservice with restricted access
export const fileService = azure.createFileService(
  azureConfig.SAS_TOKEN_RESTRICTED,
);

/**
 * Uploads file to azure file storage.
 * Returns promise that returns the uploaded file's URL inside an IFile object.
 * */
export const uploadFileToAzureFileStorage = async (
  share: string,
  directory: string,
  file,
  azureToken: string,
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
        azureToken.length > 0 &&
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
                    azureToken,
                    result.name,
                    azureToken,
                  );
                  let file: IFile = {
                    share,
                    directory,
                    fileName: name,
                    fileUrl: fileLink,
                  };
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
