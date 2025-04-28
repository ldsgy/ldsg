import { SpecificResourceSettings } from "@ldsg/types";

export interface ObjectFieldSpecificResourceSettings
  extends SpecificResourceSettings {
  /**
   * name
   */
  name: string;

  /**
   * Field Type ID
   */
  fieldTypeId: string;

  /**
   * Field Properties
   */
  properties: any;
}
