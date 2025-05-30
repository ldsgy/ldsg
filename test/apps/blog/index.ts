import { ResourceRecord } from "@ldsg/types";
import _ from "lodash";
import * as importFromResourceRecordsRes from "./resource-records";

const {
  RESOURCE_MODULE_RELATED_RESOURCE_RECORDS,
  WORKFLOW_NODE_TYPE_RESOURCE_RECORDS,
  ...rest
} = importFromResourceRecordsRes;

export const blogResourceRecords: ResourceRecord[] = [
  ...RESOURCE_MODULE_RELATED_RESOURCE_RECORDS,
  ...WORKFLOW_NODE_TYPE_RESOURCE_RECORDS,
  ..._.values(
    _.pickBy(rest, (_value, key) => {
      const res = _.endsWith(key, "ResourceRecord");

      return res;
    })
  ),
];
