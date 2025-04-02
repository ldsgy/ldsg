import { ResourceSettings } from "./resource-settings"

export interface Resource<T extends ResourceSettings = ResourceSettings> {
    /**
     * Resource ID
     */
    id: string

    /**
     * Resource Kind
     */
    kind: string

    /**
     * Parent Resource ID
     */
    parentId: string

    /**
     * Resource Settings
     */
    settings: T
}