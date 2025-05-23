import { SpecificResourceSettings } from "@ldsg/types";

export interface ResourceDefinitionSpecificResourceSettings
  extends SpecificResourceSettings {
  /**
   * Resource Kind
   */
  kind: string;

  /**
   * Parent Kind
   */
  parentKind?: string;
}
