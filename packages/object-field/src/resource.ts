import { FieldTypeResource, PlatformParams } from "@ldsg/field-type";
import { Resource } from "@ldsg/resource";
import { GeneralResourceSettings } from "@ldsg/types";
import { ObjectFieldSpecificResourceSettings } from "./types";

export interface FieldInfo extends GeneralResourceSettings {
  /**
   * Field Name
   */
  name: string;

  /**
   * Type Info
   */
  typeInfo: any;
}

interface GetFieldInfoRes {
  fieldInfo: FieldInfo;
}

type GetFieldInfo = (params: PlatformParams) => GetFieldInfoRes;

export class ObjectFieldResource extends Resource<ObjectFieldSpecificResourceSettings> {
  getFieldInfo: GetFieldInfo = (params) => {
    const { platform } = params;

    const {
      settings: { title, description, name, properties },
      getResourcesFromSettings,
    } = this;

    const { fieldTypeResource } = getResourcesFromSettings();

    const typeInfo = (fieldTypeResource as FieldTypeResource).getFieldTypeInfo({
      platform,
      fieldProperties: properties,
    });

    const fieldInfo: FieldInfo = {
      title,
      description,
      name,
      typeInfo,
    };

    const res = {
      fieldInfo,
    };

    return res;
  };
}
