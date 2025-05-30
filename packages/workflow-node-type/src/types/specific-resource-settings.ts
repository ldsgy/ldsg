import { SpecificResourceSettings } from "@ldsg/types";
import { JSONSchema7 } from "json-schema";

export interface WorkflowNodeTypeSpecificResourceSettings
  extends SpecificResourceSettings {
  /**
   * Workflow Node Properties Schema
   */
  workflowNodePropertiesSchema: JSONSchema7;
}
