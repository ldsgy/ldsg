import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as TABLE_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  TableSpecificResourceSettings,
} from "@ldsg/table";
import { ResourceRecord } from "@ldsg/types";
import { POST_INFO_WITH_ID_OBJECT_RESOURCE_ID } from "../../../object/post-info-with-id/constants";
import { MIAN_TABLES_RESOURCE_ID } from "../constants";

export const postTableResourceRecord: ResourceRecord<TableSpecificResourceSettings> =
  {
    id: "post-table",
    kind: TABLE_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
    parentId: MIAN_TABLES_RESOURCE_ID,
    settings: {
      title: "Post Table",
      description: "",
      name: "post",
      objectResourceId: POST_INFO_WITH_ID_OBJECT_RESOURCE_ID,
    },
  };
