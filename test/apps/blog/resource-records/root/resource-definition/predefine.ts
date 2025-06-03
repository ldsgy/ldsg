import { RESOURCE_MODULE_RELATED_RESOURCE_RECORDS } from "@ldsg/constants";
import { ResourceRecord } from "@ldsg/types";
import _ from "lodash";

module.exports = RESOURCE_MODULE_RELATED_RESOURCE_RECORDS.reduce(
  (previousValue, currentValue) => {
    const key = _.camelCase(`${currentValue.id}-resource-record`);

    previousValue[key] = currentValue;

    return previousValue;
  },
  {} as Record<string, ResourceRecord>
);
