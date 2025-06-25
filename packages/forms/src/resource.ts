import { ExtendExpressApp } from "@ldsg/application";
import { PlatformsParams } from "@ldsg/field-type";
import { ModifyGraphQLSchema } from "@ldsg/graphql";
import { Resource } from "@ldsg/resource";
import express from "express";
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

type GetFormInfoList = (params?: PlatformsParams) => GetFormInfoListRes;

export class FormsResource extends Resource<FormsSpecificResourceSettings> {
  formInfoList?: FormInfo[];

  getFormInfoList: GetFormInfoList = (params) => {
    const { id, formInfoList: thisFormInfoList, getFilteredResources } = this;

    let formInfoList = thisFormInfoList;

    if (!formInfoList) {
      const { resources } = getFilteredResources<{
        getFormInfo?: GetFormInfo;
      }>({
        parentId: id,
      });

      const mapRes = resources.map((resource) => {
        return resource.getFormInfo?.(params);
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

    const { formInfoList } = this.getFormInfoList();

    // 解析 JSON 请求体
    app.use(express.json());

    // 解析 URL 编码的请求体，extended: true 允许使用复杂对象
    app.use(express.urlencoded({ extended: true }));

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

      const startNodeInputVariables = {
        args: req.body,
      };

      if (!formInfo) {
        throw new Error("invalid form");
      }

      const executeRes = await formInfo.workflowInfo.execute({
        startNodeInputVariables,
      });

      const data = executeRes?.endNodeOutputVariables;

      res.json(data);
    });
  };

  modifyGraphQLSchema: ModifyGraphQLSchema = (params) => {
    const { schemaComposer } = params;

    const { Mutation, Query } = schemaComposer;

    const { formInfoList } = this.getFormInfoList();

    const { newFields } = getNewFields({
      formInfoList,
      schemaComposer,
    });

    [Mutation, Query].forEach((value) => {
      value.addFields(newFields);
    });
  };
}
