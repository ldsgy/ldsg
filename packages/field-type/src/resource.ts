import { HandlerExtendedResource } from "@ldsg/handler";
import { FieldTypeSpecificResourceSettings } from "./types";

interface GetFieldTypeInfoParams {
  /**
   * Field Properties
   */
  fieldProperties: any;

  /**
   * Platform
   * Such as mongoose\formily.
   */
  platform: string;
}

export type GetFieldTypeInfo = (params: GetFieldTypeInfoParams) => any;

export class FieldTypeResource extends HandlerExtendedResource<FieldTypeSpecificResourceSettings> {
  getFieldTypeInfo: GetFieldTypeInfo = (params) => {
    const { fieldProperties, platform } = params;

    const { getHandler } = this;

    const handler = getHandler();

    const res = handler({
      fieldProperties,
      platform,
    });

    return res;
  };
}
