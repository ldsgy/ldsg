import { stringFieldTypeResourceRecord } from "@ldsg/field-type";
import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as OBJECT_FIELD_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  ObjectFieldSpecificResourceSettings,
} from "@ldsg/object-field";
import { ResourceRecord } from "@ldsg/types";
import { POST_INFO_WITH_ID_OBJECT_RESOURCE_ID } from "../constants";

export const postInfoWithIdObjectContentObjectFieldResourceRecord: ResourceRecord<ObjectFieldSpecificResourceSettings> =
  {
    id: `${POST_INFO_WITH_ID_OBJECT_RESOURCE_ID}-content-object-field`,
    kind: OBJECT_FIELD_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
    parentId: POST_INFO_WITH_ID_OBJECT_RESOURCE_ID,
    settings: {
      title: "内容",
      description: "",
      name: "content",
      fieldTypeResourceId: stringFieldTypeResourceRecord.id,
      properties: {},
    },
  };
