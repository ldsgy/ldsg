import { mongoIdFieldTypeResourceRecord } from "@ldsg/field-type";
import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as OBJECT_FIELD_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  ObjectFieldSpecificResourceSettings,
} from "@ldsg/object-field";
import { ResourceRecord } from "@ldsg/types";
import { ID_OBJECT_RESOURCE_ID } from "../constants";

export const idObjectIdObjectFieldResourceRecord: ResourceRecord<ObjectFieldSpecificResourceSettings> =
  {
    id: `${ID_OBJECT_RESOURCE_ID}-id-object-field`,
    kind: OBJECT_FIELD_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
    parentId: ID_OBJECT_RESOURCE_ID,
    settings: {
      title: "ID",
      description: "",
      name: "id",
      fieldTypeResourceId: mongoIdFieldTypeResourceRecord.id,
      properties: {},
    },
  };
