import { ObjectResource } from "@ldsg/object";
import { Resource } from "@ldsg/resource";
import { GetTableInfo, TableInfo } from "@ldsg/tables";
import { TableSpecificResourceSettings } from "./types";

export class TableResource extends Resource<TableSpecificResourceSettings> {
  getTableInfo: GetTableInfo = (params) => {
    const { platform } = params;

    const {
      settings: { title, description, name },
      getResourcesFromSettings,
    } = this;

    const { objectResource, databaseResource } = getResourcesFromSettings();

    const { objectInfo } = (objectResource as ObjectResource).getObjectInfo({
      platform,
    });

    const res: TableInfo = {
      title,
      description,
      name,
      objectInfo,
    };

    return res;
  };
}
