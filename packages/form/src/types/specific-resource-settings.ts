import { SpecificResourceSettings } from "@ldsg/types";

export interface FormSpecificResourceSettings extends SpecificResourceSettings {
  /**
   * Form Name
   */
  name: string;

  /**
   * Input Object Resource Id
   */
  inputObjectResourceId: string;

  /**
   * Output Object Resource Id
   */
  outputObjectResourceId: string;

  /**
   * Workflow Resource Id
   */
  workflowResourceId: string;
}
