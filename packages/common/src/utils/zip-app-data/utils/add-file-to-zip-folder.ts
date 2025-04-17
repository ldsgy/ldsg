import JSZip from "jszip";
import _ from "lodash";
import { AppDataFile, FileData } from "../../../types";

interface AddFileToZipFolderParams extends AppDataFile {
  folder: JSZip;
  data: FileData;
}

type AddFileToZipFolder = (params: AddFileToZipFolderParams) => void;

export const addFileToZipFolder: AddFileToZipFolder = (params) => {
  const { folder, path, data } = params;

  folder.file(path, _.isObject(data) ? JSON.stringify(data) : data);
};
