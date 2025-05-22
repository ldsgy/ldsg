import { ExtendExpressApp } from "@ldsg/application";
import { PlatformParams } from "@ldsg/field-type";
import { ModifyGraphQLSchema } from "@ldsg/graphql";
import { Resource } from "@ldsg/resource";
import _ from "lodash";
import { FORMS_ROUTE } from "./constants";
import { FormInfo, FormsSpecificResourceSettings, GetFormInfo } from "./types";
import { getNewFields } from "./utils";

interface GetFormInfoListRes {
  /**
   * Form Info List
   */
  formInfoList: FormInfo[];
}

type GetFormInfoList = (params: PlatformParams) => GetFormInfoListRes;

export class FormsResource extends Resource<FormsSpecificResourceSettings> {
  getFormInfoList: GetFormInfoList = (params) => {
    const { platform } = params;

    const { id, getFilteredResources } = this;

    const { resources } = getFilteredResources<{
      getFormInfo?: GetFormInfo;
    }>({
      parentId: id,
    });

    const mapRes = resources.map((resource) => {
      return resource.getFormInfo?.({ platform });
    });

    const formInfoList = _.filter(mapRes, (value) => !_.isUndefined(value));

    const res = {
      formInfoList,
    };

    return res;
  };

  extendExpressApp: ExtendExpressApp = async (params) => {
    const { app } = params;

    /**
     * RESTful
     */
    app.all(FORMS_ROUTE, (req, res) => {});
  };

  modifyGraphQLSchema: ModifyGraphQLSchema = (params) => {
    const { schemaComposer } = params;

    const { formInfoList } = this.getFormInfoList({
      platform: "graphql",
    });

    const { newFields } = getNewFields({
      formInfoList,
      schemaComposer,
    });

    schemaComposer.Mutation.addFields(newFields);
    schemaComposer.Query.addFields(newFields);
  };
}
