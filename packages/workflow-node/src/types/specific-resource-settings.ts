import { SpecificResourceSettings } from "@ldsg/types";

export interface WorkflowNodeSpecificResourceSettings
  extends SpecificResourceSettings {
  /**
   * Workflow Node Type Resource ID
   */
  workflowNodeTypeResourceId: string;

  /**
   * Workflow Node Properties
   */
  properties?: any;
}
