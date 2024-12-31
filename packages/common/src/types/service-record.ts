import { Service, Settings } from "@ldsg/core";

export interface ServiceRecord {
  id: string;
  parentId?: string;
  type: string;
  settings?: Settings;
}

export type ServiceRecords = ServiceRecord[];

export type ServiceTypeMap = Record<
  string,
  {
    class: typeof Service;
  }
>;
