import { ServiceRecords } from "./service-record";

export interface AppDataFile {
  name: string;
  content: string | object;
}

export interface AppData {
  environmentVariables?: Record<string, string>;
  reuseMainAppDependencies?: string[];
  files?: AppDataFile[];
  serviceRecords: ServiceRecords;
}
