import { SpecificResourceSettings } from "@ldsg/types";

export interface FieldTypeSpecificResourceSettings
  extends SpecificResourceSettings {
  /**
   * field type name
   */
  name: string;

  /**
   * Platform Type Map
   */
  platformTypeMap: Record<string, Record<string, any>>;
}
