import { FieldTypeResource } from "@ldsg/field-type";
import { Resource } from "@ldsg/resource";
import { ObjectFieldSpecificResourceSettings } from "./types";

interface GetFieldInfoParams {
  /**
   * Platform
   * Such as mongoose\formily.
   */
  platform: string;
}

interface GetFieldInfoRes {
  /**
   * Name
   */
  name: string;

  /**
   * Type Info
   */
  typeInfo: any;
}

type GetFieldInfo = (params: GetFieldInfoParams) => GetFieldInfoRes;

export class ObjectFieldResource extends Resource<ObjectFieldSpecificResourceSettings> {
  getFieldInfo: GetFieldInfo = (params) => {
    const { platform } = params;

    const {
      settings: { name, fieldTypeId, properties },
      getFilteredResource,
    } = this;

    const getFilteredResourceRes = getFilteredResource({
      id: fieldTypeId,
    });

    const fieldTypeResource =
      getFilteredResourceRes.resource as FieldTypeResource;

    const typeInfo = fieldTypeResource.getFieldTypeInfo({
      platform,
      fieldProperties: properties,
    });

    const res = {
      name,
      typeInfo,
    };

    return res;
  };
}
