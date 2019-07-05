export default interface IFile {
  filename: string;
  handle: string;
  mimetype: string;
  originalFile;
  originalPath: string;
  size: number;
  source: string;
  status: string;
  uploadedId: string;
  url: string;
}
