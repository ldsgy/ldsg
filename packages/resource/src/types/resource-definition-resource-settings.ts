import { ResourceSettings } from "./manifest";

export interface ResourceDefinitionResourceSettings extends ResourceSettings {
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
