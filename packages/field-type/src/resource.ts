import { HandlerExtendedResource } from "@ldsg/handler";
import { FieldTypeSpecificResourceSettings, GetFieldTypeInfo } from "./types";

export class FieldTypeResource extends HandlerExtendedResource<FieldTypeSpecificResourceSettings> {
  getFieldTypeInfo: GetFieldTypeInfo = (params) => {
    const { fieldProperties, platform = "common" } = params;

    const { getHandler } = this;

    const handler = getHandler();

    const res = handler({
      fieldProperties,
      platform,
    });

    return res;
  };
}
