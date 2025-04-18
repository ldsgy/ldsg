import { Manifest, ResourceRecord } from "@ldsg/resource";
import { RESOURCE_KINDS_RESOURCE_RECORDS } from "../constants";

interface Params {
  resourceRecords?: ResourceRecord[];
}

export const getConstants = (params: Params) => {
  const { resourceRecords = [] } = params;

  const manifest: Manifest = {
    resourceRecords: [...RESOURCE_KINDS_RESOURCE_RECORDS, ...resourceRecords],
  };

  const res = { manifest };

  return res;
};
