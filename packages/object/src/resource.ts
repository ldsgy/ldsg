import { PlatformsParams } from "@ldsg/field-type";
import { Resource } from "@ldsg/resource";
import { GeneralResourceSettings } from "@ldsg/types";
import _ from "lodash";
import {
  FieldInfo,
  GetFieldInfo,
  ObjectSpecificResourceSettings,
} from "./types";

export interface ExtendedObjectInfo {
  /**
   * Field Info List
   */
  fieldInfoList: FieldInfo[];
}

export interface GetExtendedObjectInfoRes {
  /**
   * Extended Object Info
   */
  extendedObjectInfo: ExtendedObjectInfo;
}

type GetExtendedObjectInfo = (
  params?: PlatformsParams
) => GetExtendedObjectInfoRes;

export interface ObjectInfo extends GeneralResourceSettings {
  /**
   * Object Name
   */
  name: string;

  /**
   * Field Info List
   */
  fieldInfoList: FieldInfo[];
}

export interface GetObjectInfoRes {
  /**
   * Object Info
   */
  objectInfo: ObjectInfo;
}

type GetObjectInfo = (params?: PlatformsParams) => GetObjectInfoRes;

export class ObjectResource extends Resource<ObjectSpecificResourceSettings> {
  getExtendedObjectInfo: GetExtendedObjectInfo = (params) => {
    const {
      settings: { extendedResourceIds },
      getFilteredResource,
    } = this;

    const fieldInfoListGroup = _.map(
      extendedResourceIds,
      (extendedResourceId) => {
        const { resource } = getFilteredResource<ObjectResource>({
          id: extendedResourceId,
        });

        const getObjectInfoRes = resource?.getObjectInfo(params);

        const res = getObjectInfoRes?.objectInfo.fieldInfoList || [];

        return res;
      }
    );

    const fieldInfoList = _.flatten(fieldInfoListGroup);

    const extendedObjectInfo: ExtendedObjectInfo = {
      fieldInfoList,
    };

    const res = {
      extendedObjectInfo,
    };

    return res;
  };

  getObjectInfo: GetObjectInfo = (params) => {
    const {
      id,
      settings: { title, description, name },
      getExtendedObjectInfo,
      getFilteredResources,
    } = this;

    const { extendedObjectInfo } = getExtendedObjectInfo(params);

    const { fieldInfoList: extendedFieldInfoList } = extendedObjectInfo;

    const { resources } = getFilteredResources<{ getFieldInfo?: GetFieldInfo }>(
      {
        parentId: id,
      }
    );

    const mapRes = resources.map((resource) => {
      const fieldInfo = resource.getFieldInfo?.(params);

      return fieldInfo;
    });

    const filterRes = _.filter(mapRes, (value) => !_.isUndefined(value));

    const currentFieldInfoList = _.map(filterRes, "fieldInfo");

    const fieldInfoList = extendedFieldInfoList.concat(currentFieldInfoList);

    const objectInfo: ObjectInfo = {
      title,
      description,
      name,
      fieldInfoList,
    };

    const res = {
      objectInfo,
    };

    return res;
  };
}
