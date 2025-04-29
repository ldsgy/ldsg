import { FormInfo, FormResource } from "@ldsg/form";
import { ModifyGraphQLSchema } from "@ldsg/graphql";
import { Resource } from "@ldsg/resource";
import { FormsSpecificResourceSettings } from "./types";

interface GetFormInfoListParams {
  /**
   * Platform
   * Such as mongoose\formily.
   */
  platform: string;
}

interface GetFormInfoListRes {
  /**
   * Form Info List
   */
  formInfoList: FormInfo[];
}

type GetFormInfoList = (params: GetFormInfoListParams) => GetFormInfoListRes;

export class FormsResource extends Resource<FormsSpecificResourceSettings> {
  getSubFormResources = () => {
    const { id, getFilteredResources } = this;

    const { resources } = getFilteredResources({
      parentId: id,
    });

    return resources as FormResource[];
  };

  getFormInfoList: GetFormInfoList = (params) => {
    const { platform } = params;

    const { getSubFormResources } = this;

    const formResources = getSubFormResources();

    const formInfoList = formResources.map((formResource) => {
      return formResource.getFormInfo({ platform });
    });

    const res = {
      formInfoList,
    };

    return res;
  };

  modifyGraphQLSchema: ModifyGraphQLSchema = (params) => {
    const { schemaComposer } = params;
  };
}
