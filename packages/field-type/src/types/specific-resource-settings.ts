import { SpecificResourceSettings } from "@ldsg/types";
import { JSONSchema7 } from "json-schema";

export interface FieldTypeSpecificResourceSettings
  extends SpecificResourceSettings {
  /**
   * Field Properties Schema
   */
  fieldPropertiesSchema?: JSONSchema7;
}
