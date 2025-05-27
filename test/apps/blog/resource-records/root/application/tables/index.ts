import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as TABLES_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  TablesSpecificResourceSettings,
} from "@ldsg/tables";
import { ResourceRecord } from "@ldsg/types";
import { BLOG_APPLICATION_RESOURCE_ID } from "../constants";
import { MIAN_TABLES_RESOURCE_ID } from "./constants";

export * from "./table/post";

export const mianTablesResourceRecord: ResourceRecord<TablesSpecificResourceSettings> =
  {
    id: MIAN_TABLES_RESOURCE_ID,
    kind: TABLES_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
    parentId: BLOG_APPLICATION_RESOURCE_ID,
    settings: {
      title: "Main Tables",
      description: "",
    },
  };
