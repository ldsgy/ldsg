import { SpecificResourceSettings } from "@ldsg/types";

export interface GraphqlSpecificResourceSettings
  extends SpecificResourceSettings {
  /**
   * GraphQL Endpoint
   */
  endpoint?: string;
}
