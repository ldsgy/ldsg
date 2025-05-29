import { RESOURCE_MODULE_RELATED_RESOURCE_RECORDS } from "@ldsg/constants";
import { ResourceRecord } from "@ldsg/types";
import _ from "lodash";
import * as importFromResourceRecordsRes from "./resource-records";

export const blogResourceRecords: ResourceRecord[] = [
  ...RESOURCE_MODULE_RELATED_RESOURCE_RECORDS,
  ..._.values(
    _.pickBy(importFromResourceRecordsRes, (_value, key) => {
      const res = _.endsWith(key, "ResourceRecord");

      return res;
    })
  ),
];
