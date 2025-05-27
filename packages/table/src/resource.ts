import { ObjectResource } from "@ldsg/object";
import { Resource } from "@ldsg/resource";
import { GetTableInfo, TableInfo } from "@ldsg/tables";
import { TableSpecificResourceSettings } from "./types";

export class TableResource extends Resource<TableSpecificResourceSettings> {
  getTableInfo: GetTableInfo = (params) => {
    const {
      settings: { title, description, name },
      getResourcesFromSettings,
    } = this;

    const { objectResource, databaseResource } = getResourcesFromSettings();

    if (!objectResource) {
      throw new Error("invalid object resource");
    }

    const { getObjectInfo } = objectResource as ObjectResource;

    if (!getObjectInfo) {
      throw new Error("invalid get object info");
    }

    const { objectInfo } = getObjectInfo(params);

    const res: TableInfo = {
      title,
      description,
      name,
      objectInfo,
    };

    return res;
  };
}
