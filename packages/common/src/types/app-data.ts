import { Manifest } from "@ldsg/resource";

export interface AppDataFile {
  name: string;
  content: string | object;
}

export interface AppData extends Manifest {
  environmentVariables?: Record<string, string>;
  reuseMainAppDependencies?: string[];
  files?: AppDataFile[];
}
