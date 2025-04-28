import { FieldInfo, FormFieldResource } from "@ldsg/form-field";
import { Resource } from "@ldsg/resource";
import { FormSpecificResourceSettings } from "./types";

interface GetFormInfoParams {
  /**
   * Platform
   * Such as mongoose\formily.
   */
  platform: string;
}

interface GetFormInfoRes {
  /**
   * Form Name
   */
  name: string;

  /**
   * Field Info List
   */
  fieldInfoList: FieldInfo[];
}

type GetFormInfo = (params: GetFormInfoParams) => GetFormInfoRes;

export class FormResource extends Resource<FormSpecificResourceSettings> {
  getFormInfo: GetFormInfo = (params) => {
    const { platform } = params;

    const {
      id,
      settings: { name },
      getFilteredResources,
    } = this;

    const getFilteredResourcesRes = getFilteredResources({
      parentId: id,
    });

    const formFieldResources =
      getFilteredResourcesRes.resources as FormFieldResource[];

    const fieldInfoList = formFieldResources.map((formFieldResource) => {
      const fieldInfo = formFieldResource.getFieldInfo({ platform });

      return fieldInfo;
    });

    const res = {
      name,
      fieldInfoList,
    };

    return res;
  };
}
