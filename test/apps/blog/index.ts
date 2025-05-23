import { ResourceRecord } from "@ldsg/types";
import _ from "lodash";
import * as importFromResourceRecordsRes from "./resource-records";

export const blogResourceRecords: ResourceRecord[] = _.values(
  importFromResourceRecordsRes
);
