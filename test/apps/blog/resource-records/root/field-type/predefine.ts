import { FIELD_TYPE_RELATED_RESOURCE_RECORD } from "@ldsg/field-type";
import { ResourceRecord } from "@ldsg/types";
import _ from "lodash";

module.exports = FIELD_TYPE_RELATED_RESOURCE_RECORD.reduce(
  (previousValue, currentValue) => {
    const key = _.camelCase(`${currentValue.id}-resource-record`);

    previousValue[key] = currentValue;

    return previousValue;
  },
  {} as Record<string, ResourceRecord>
);
