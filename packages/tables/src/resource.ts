import { PlatformsParams } from "@ldsg/field-type";
import { ModifyGraphQLSchema } from "@ldsg/graphql";
import { Resource } from "@ldsg/resource";
import _ from "lodash";
import {
  GetTableInfo,
  TableInfo,
  TablesSpecificResourceSettings,
} from "./types";
import { addFields } from "./utils";

interface GetTableInfoListRes {
  /**
   * Table Info List
   */
  tableInfoList: TableInfo[];
}

type GetTableInfoList = (params?: PlatformsParams) => GetTableInfoListRes;

export class TablesResource extends Resource<TablesSpecificResourceSettings> {
  getTableInfoList: GetTableInfoList = (params) => {
    const { id, getFilteredResources } = this;

    const { resources } = getFilteredResources<{
      getTableInfo?: GetTableInfo;
    }>({
      parentId: id,
    });

    const mapRes = resources.map((resource) => {
      return resource.getTableInfo?.(params);
    });

    const tableInfoList = _.filter(mapRes, (value) => !_.isUndefined(value));

    const res = {
      tableInfoList,
    };

    return res;
  };

  modifyGraphQLSchema: ModifyGraphQLSchema = (params) => {
    const { schemaComposer } = params;

    const { tableInfoList } = this.getTableInfoList();

    addFields({
      tableInfoList,
      schemaComposer,
    });
  };
}
