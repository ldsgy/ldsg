import { HandlerExtendedResource } from "@ldsg/handler";
import { FieldTypeSpecificResourceSettings } from "./types";

interface GetFieldTypeParams {
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

export type GetFieldType = (params: GetFieldTypeParams) => any;

export class FieldTypeResource extends HandlerExtendedResource<FieldTypeSpecificResourceSettings> {
  getFieldType: GetFieldType = (params) => {
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
