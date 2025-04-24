import { ResourceRecord } from "@ldsg/types";
import _ from "lodash";
import { getResourceRecordsByResourceModule } from "./get-resource-records-by-resource-module";

interface Params {
  resourceModules: any[];
}

interface Res {
  resourceRecords: ResourceRecord[];
}

type GetResourceRecordsByResourceModules = (params: Params) => Res;

export const getResourceRecordsByResourceModules: GetResourceRecordsByResourceModules =
  (params) => {
    const { resourceModules } = params;

    const resourceRecords: ResourceRecord[] = _.flatMap(
      resourceModules.map((resourceModule) => {
        const { resourceRecords } = getResourceRecordsByResourceModule({
          resourceModule,
        });

        return resourceRecords;
      })
    );

    const res = { resourceRecords };

    return res;
  };
