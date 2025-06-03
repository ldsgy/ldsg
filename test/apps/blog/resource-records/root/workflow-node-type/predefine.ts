import { ResourceRecord } from "@ldsg/types";
import { WORKFLOW_NODE_TYPE_RESOURCE_RECORDS } from "@ldsg/workflow-node-type";
import _ from "lodash";

module.exports = WORKFLOW_NODE_TYPE_RESOURCE_RECORDS.reduce(
  (previousValue, currentValue) => {
    const key = _.camelCase(`${currentValue.id}-resource-record`);

    previousValue[key] = currentValue;

    return previousValue;
  },
  {} as Record<string, ResourceRecord>
);
