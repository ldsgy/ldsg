import {
  ResourceSettings,
  SpecificResourceSettings,
} from "./resource-settings";

/**
 * Resource Config
 */
export interface ResourceRecord<
  T extends SpecificResourceSettings = SpecificResourceSettings
> {
  /**
   * Resource ID
   */
  id: string;

  /**
   * Resource Kind
   * Connect uppercase letters with underscores
   */
  kind: string;

  /**
   * Parent Resource ID
   */
  parentId: string;

  /**
   * Resource Settings
   */
  settings: ResourceSettings<T>;
}
