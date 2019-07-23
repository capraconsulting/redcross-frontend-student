export default interface IFile {
  file: {
    name: string;
    handle?: string;
    mimetype?: string;
    originalFile?;
    originalPath?: string;
    size: number;
    source?: string;
    status?: string;
    uploadedId?: string;
    url?: string;
    type?: string;
  };
  azure?;
}
