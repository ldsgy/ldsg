import { SpecificResourceSettings } from "@ldsg/types";

export interface ResourceDefinitionSpecificResourceSettings
  extends SpecificResourceSettings {
  /**
   * Resource Kind
   */
  kind: string;

  /**
   * Sub Resource Kinds
   * When it is an empty array, there are no sub resource.
   */
  subKinds: string[];
}
