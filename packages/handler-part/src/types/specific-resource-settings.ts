import { SpecificResourceSettings } from "@ldsg/types";

export interface HandlerResourceDependency {
  /**
   * Name
   */
  name: string;

  /**
   * Version
   * pnpm add <name>@<version>
   */
  version?: string;

  /**
   * URI
   * pnpm add <uri>
   */
  uri?: string;
}

export interface HandlerSpecificResourceSettings
  extends SpecificResourceSettings {
  /**
   * Code
   * The code must exist to avoid problems caused by different versions resulting from dependencies being installed in the root project.
   */
  code: string;

  /**
   * Dependencies
   */
  dependencies: HandlerResourceDependency[];
}
