import { Manifest } from "@ldsg/resource";

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

export interface HandlerResourceSettings extends Manifest.ResourceSettings {
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
