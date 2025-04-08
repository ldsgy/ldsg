import { Manifest } from "@ldsg/resource";

export interface ResourceDefinitionSettings extends Manifest.ResourceSettings {
  /**
   * Resource Kind
   */
  kind: string;

  /**
   * Sub Resource Kinds
   * When it is an empty array, there are no sub resource.
   */
  subResourceKinds: string[];
}
