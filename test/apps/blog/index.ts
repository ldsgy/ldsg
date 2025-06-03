import { ResourceRecord } from "@ldsg/types";
import _ from "lodash";
import * as resourceRecords from "./resource-records";

export const blogResourceRecords: ResourceRecord[] = [
  ..._.values(
    _.pickBy(resourceRecords, (_value, key) => {
      const res = _.endsWith(key, "ResourceRecord");

      return res;
    })
  ),
];
