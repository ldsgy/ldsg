import { FieldInfo, ObjectFieldResource } from "@ldsg/object-field";
import { Resource } from "@ldsg/resource";
import { ObjectSpecificResourceSettings } from "./types";

interface GetObjectInfoParams {
  /**
   * Platform
   * Such as mongoose\formily.
   */
  platform: string;
}

export interface ObjectInfo {
  /**
   * Object Name
   */
  name: string;

  /**
   * Field Info List
   */
  fieldInfoList: FieldInfo[];
}

type GetObjectInfo = (params: GetObjectInfoParams) => ObjectInfo;

export class ObjectResource extends Resource<ObjectSpecificResourceSettings> {
  getObjectInfo: GetObjectInfo = (params) => {
    const { platform } = params;

    const {
      id,
      settings: { name },
      getFilteredResources,
    } = this;

    const getFilteredResourcesRes = getFilteredResources({
      parentId: id,
    });

    const objectFieldResources =
      getFilteredResourcesRes.resources as ObjectFieldResource[];

    const fieldInfoList = objectFieldResources.map((objectFieldResource) => {
      const fieldInfo = objectFieldResource.getFieldInfo({ platform });

      return fieldInfo;
    });

    const res: ObjectInfo = {
      name,
      fieldInfoList,
    };

    return res;
  };
}
