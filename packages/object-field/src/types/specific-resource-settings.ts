import { SpecificResourceSettings } from "@ldsg/types";

export interface ObjectFieldSpecificResourceSettings
  extends SpecificResourceSettings {
  /**
   * Field Name
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
