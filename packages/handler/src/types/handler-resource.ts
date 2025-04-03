import { Resource } from "./resource";
import { ResourceSettings } from "./resource-settings";

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

export interface HandlerResourceSettings extends ResourceSettings {
    /**
     * Code
     */
    code: string

    /**
     * Dependencies
     */
    dependencies: HandlerResourceDependency[];
}

export interface HandlerResource extends Resource<HandlerResourceSettings> {
}