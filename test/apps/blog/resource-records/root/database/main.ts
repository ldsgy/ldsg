import { ROOT_RESOURCE_ID } from "@ldsg/constants";
import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as DATABASE_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  DatabaseSpecificResourceSettings,
} from "@ldsg/database";
import { ResourceRecord } from "@ldsg/types";

const { DATABASE_URI } = process.env;

if (!DATABASE_URI) {
  throw new Error("invalid env DATABASE_URI");
}

export const mainDatabaseResourceRecord: ResourceRecord<DatabaseSpecificResourceSettings> =
  {
    id: "main-database",
    kind: DATABASE_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind,
    parentId: ROOT_RESOURCE_ID,
    settings: {
      title: "主要数据库",
      description: "",
      uri: DATABASE_URI,
    },
  };
