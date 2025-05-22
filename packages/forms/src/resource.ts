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
  formInfoList?: FormInfo[];

  getFormInfoList: GetFormInfoList = (params) => {
    const { platform } = params;

    const { id, formInfoList: thisFormInfoList, getFilteredResources } = this;

    let formInfoList = thisFormInfoList;

    if (!formInfoList) {
      const { resources } = getFilteredResources<{
        getFormInfo?: GetFormInfo;
      }>({
        parentId: id,
      });

      const mapRes = resources.map((resource) => {
        return resource.getFormInfo?.({ platform });
      });

      const filterRes = _.filter(mapRes, (value) => !_.isUndefined(value));

      formInfoList = filterRes;

      this.formInfoList = formInfoList;
    }

    const res = {
      formInfoList,
    };

    return res;
  };

  extendExpressApp: ExtendExpressApp = async (params) => {
    const { app } = params;

    const { formInfoList } = this.getFormInfoList({
      platform: "graphql",
    });

    /**
     * RESTful
     */
    app.get(FORMS_ROUTE, (req, res) => {
      res.json({
        list: formInfoList,
      });
    });

    app.get(`${FORMS_ROUTE}/:formId`, (req, res) => {
      const { formId } = req.params;

      const formInfo = formInfoList.find((formInfo) => {
        return formInfo.id === formId;
      });

      res.json(formInfo);
    });

    app.post(`${FORMS_ROUTE}/:formId`, async (req, res) => {
      const { formId } = req.params;

      const formInfo = formInfoList.find((formInfo) => {
        return formInfo.id === formId;
      });

      const executeRes = await formInfo?.workflowInfo.execute({
        startNodeOutputVariables: req.body,
      });

      const data = executeRes?.endNodeOutputVariables;

      res.json(data);
    });
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
