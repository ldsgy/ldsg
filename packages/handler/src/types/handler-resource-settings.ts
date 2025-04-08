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
   * When code is undefined, import handler from first in dependencies.
   */
  code?: string;

  /**
   * Dependencies
   */
  dependencies: HandlerResourceDependency[];
}
