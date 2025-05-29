import { HandlerExtendedResource } from "@ldsg/handler";
import { FieldTypeBasePlatformList } from "./constants";
import {
  FieldTypePlatform,
  FieldTypeSpecificResourceSettings,
  GetFieldTypeInfo,
  GetFieldTypeInfoRes,
  PlatformToTypeMap,
} from "./types";
import { FieldTypeResourceHandler } from "./types/field-type-resource-handler";

export class FieldTypeResource extends HandlerExtendedResource<FieldTypeSpecificResourceSettings> {
  getFieldTypeInfo: GetFieldTypeInfo = (params) => {
    const {
      fieldProperties,
      platforms: paramsPlatforms,
      extraPlatforms,
    } = params;

    const { getExtendedHandler } = this;

    const extendedHandler: FieldTypeResourceHandler = getExtendedHandler();

    let platforms: FieldTypePlatform[] = paramsPlatforms
      ? paramsPlatforms
      : extraPlatforms
      ? [...FieldTypeBasePlatformList, ...extraPlatforms]
      : FieldTypeBasePlatformList;

    const platformToTypeMap: PlatformToTypeMap = {};

    for (const platform of platforms) {
      const fieldType = extendedHandler({
        fieldProperties,
        platform,
      });

      platformToTypeMap[platform] = fieldType;
    }

    const res: GetFieldTypeInfoRes = {
      fieldTypeInfo: {
        platformToTypeMap,
      },
    };

    return res;
  };
}
