import { PlatformParams } from "@ldsg/field-type";
import { Resource } from "@ldsg/resource";
import { GeneralResourceSettings } from "@ldsg/types";
import _ from "lodash";
import {
  FieldInfo,
  GetFieldInfo,
  ObjectSpecificResourceSettings,
} from "./types";

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

type GetObjectInfo = (params: PlatformParams) => GetObjectInfoRes;

export class ObjectResource extends Resource<ObjectSpecificResourceSettings> {
  getObjectInfo: GetObjectInfo = (params) => {
    const { platform } = params;

    const {
      id,
      settings: { title, description, name },
      getFilteredResources,
    } = this;

    const { resources } = getFilteredResources<{ getFieldInfo?: GetFieldInfo }>(
      {
        parentId: id,
      }
    );

    const mapRes = resources.map((resource) => {
      const fieldInfo = resource.getFieldInfo?.({ platform });

      return fieldInfo;
    });

    const filterRes = _.filter(mapRes, (value) => !_.isUndefined(value));

    const fieldInfoList = _.map(filterRes, "fieldInfo");

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
