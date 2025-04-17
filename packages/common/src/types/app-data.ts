import { Manifest } from "@ldsg/resource";

export type AppDataFileData = string | object;

export interface AppDataFile {
  path: string;
  data: AppDataFileData;
}

export interface AppData extends Manifest {
  environmentVariables?: Record<string, string>;
  reuseMainAppDependencies?: string[];
  files?: AppDataFile[];
}
