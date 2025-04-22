import { Manifest } from "./manifest";

export type FileData = string | object;

export type AppDataFileData = FileData | undefined;

export interface AppDataFile {
  path: string;
  data: AppDataFileData;
}

export interface AppData extends Manifest {
  environmentVariables?: Record<string, string>;
  reuseMainAppDependencies?: string[];
  filesInHandlerModele?: AppDataFile[];
  filesInRootModele?: AppDataFile[];
}
