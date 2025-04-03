import { Resource } from "./resource"
import { ResourceSettings } from "./resource-settings"

export interface ResourceDefinitionSettings extends ResourceSettings {
    /**
     * Resource Kind
     */
    kind: string

    /**
     * Sub Resource Kinds
     * When it is an empty array, there are no sub resource.
     */
    subResourceKinds: string[]
}

export interface ResourceDefinition extends Resource<ResourceDefinitionSettings> {
}