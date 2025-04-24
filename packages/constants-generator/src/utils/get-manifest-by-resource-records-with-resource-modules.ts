import { Manifest, ResourceRecord } from "@ldsg/types";
import { RESOURCE_MODULES } from "../constants";
import { getResourceRecordsByResourceModules } from "./get-resource-records-by-resource-modules";

interface Params {
  resourceModules?: any[];
  resourceRecords: ResourceRecord[];
}

export const getManifestByResourceRecordsWithResourceModules = (
  params: Params
) => {
  const {
    resourceModules = RESOURCE_MODULES,
    resourceRecords: paramsResourceRecords,
  } = params;

  const getResourceRecordsByResourceModulesRes =
    getResourceRecordsByResourceModules({
      resourceModules,
    });

  const manifest: Manifest = {
    resourceRecords: [
      ...getResourceRecordsByResourceModulesRes.resourceRecords,
      ...paramsResourceRecords,
    ],
  };

  const res = { manifest };

  return res;
};
